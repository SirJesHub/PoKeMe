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
    // console.log(
    //   `room id: ${roomId} has ${io.sockets.adapter.rooms.get(roomId).size} player`
    // );
    // socket.server
    //   .in(roomId)
    //   .emit("send_player_count", io.sockets.adapter.rooms.get(roomId).size);
    const roomSize = io.of("/").adapter.rooms.get(roomId).size;
    console.log("room Size", roomSize);
    if (roomSize == 2) {
      socket.nsp.to(roomId).emit("send_player_count", roomSize);
    } else if (roomSize > 2) {
      io.to(socket.id).emit("room_full");
    }
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
