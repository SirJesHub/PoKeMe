const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const rooms = {};
const player = {};

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

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id}joined room: ${data}`);
    const roomSize = io.of("/").adapter.rooms.get(data).size;
    console.log("room Size", roomSize);

    if (!rooms[data]) {
      rooms[data] = {
        players: new Set(),
      };
    }

    rooms[data].players.add(socket.id);

    player[socket.id] = { room: data };

    if (roomSize == 2) {
      socket.nsp.to(data).emit("ready_for_char");
    }
  });

  socket.on("send_input", (data) => {
    console.log(`recieve input = ${data.input}`);
    socket.to(data.room).emit("recieve_input", data);
  });

  socket.on("send_answer", (data) => {
    console.log(`recieve answer = ${data.answer}`);
  });

  socket.on("select_char", (charId) => {
    const playerId = socket.id;
    const roomId = player[playerId].room;

    player[socket.id].char = charId;

    const room = rooms[roomId];

    let isReadyForGameStart = true;
    for (const pid of room.players.values()) {
      if (player[pid].char == undefined) {
        isReadyForGameStart = false;
      }
    }

    if (isReadyForGameStart) {
      socket.nsp.to(roomId).emit("game_start");
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconencted: ${socket.id}`);
    const pid = socket.id;
    // clear user data
    player[pid] = undefined;
    for (const roomId of Object.keys(rooms)) {
      rooms[roomId].player.delete(pid);
    }
  });
});

server.listen(3001, () => console.log("SERVER IS RUNNING"));
