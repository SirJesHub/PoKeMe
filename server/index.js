const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User conencted: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
    console.log(
      `room id: ${roomId} + ${io.sockets.adapter.rooms.get(roomId).size}`
    );
    socket.server
      .in(roomId)
      .emit("test", io.sockets.adapter.rooms.get(roomId).size);
  });

  // socket.on("req_player_count", (data) => {
  //   console.log(`player count + ${io.sockets.adapter.rooms.get(data).size}`);
  //   socket
  //     .to()
  //     .emit("send_player_count", io.sockets.adapter.rooms.get(data).size);
  // });

  socket.on("send_input", (data) => {
    console.log(`recieve input = ${data.input}`);
    socket.to(data.room).emit("recieve_input", data);
  });

  socket.on("send_answer", (data) => {
    console.log(`recieve answer = ${data.answer}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconencted: ${socket.id}`);
  });
});

server.listen(3001, () => console.log("SERVER IS RUNNING"));
