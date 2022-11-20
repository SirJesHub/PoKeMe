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
      socket.nsp.to(data).emit("send_player_count", roomSize);
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
    console.log(`recieve input = ${data.input} from room = ${data.room}`);
    socket.to(data.room).emit("recieve_input", data);
  });

  socket.on("send_answer", (data) => {
    console.log(`recieve answer = ${data.answer}`);
    socket.to(data.room).emit("recieve_answer", data);
  });

  socket.on("set_ready", (data) => {
    socket.to(data.room).emit("get_ready", data);
  });

  socket.on("switch_role", (data) => {
    console.log("switching role -->");
    console.log(data);
    socket.to(data.room).emit("switching_role", data);
  });

  socket.on("switch_isTyping", (data) => {
    console.log("---------------------");
    console.log(data);
    console.log(`current turn ${data.isTurn}`);
    console.log(`typing? ${data.isTyping}`);
    console.log("---------------------");
    socket.to(data.room).emit("switching_isTyping", data);
  });

  socket.on("switch_isTurn", (data) => {
    console.log(data);
    console.log(`current turn ${data.isTurn}`);
    console.log(`typing? ${data.isTyping}`);
    socket.to(data.room).emit("switching_isTurn", data);
  });

  socket.on("end_game", (data) => {
    console.log("ending game");
    console.log(`From P1: ${data.score}`);
    socket.to(data.room).emit("ending_game", data);
  });

  socket.on("end_game_for_another", (data) => {
    console.log(`From P2: ${data.score}`);
    socket.to(data.room).emit("ending_game_for_another", data);
  });

  // socket.on("turn_end", (data) => {
  //   console.log(`recieve answer = ${data.answer}`);
  //   socket.nsp.to(data).emit("your turn", data);
  // });

  socket.on("select_char", (charId) => {
    const playerId = socket.id;
    const roomId = player[playerId]?.room;

    player[playerId].char = charId;

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

  socket.on("get_both_charID", () => {
    const playerId = socket.id;
    const roomId = player[playerId]?.room;
    const room = rooms[roomId];
    let myCharID = undefined;
    let otherCharID = undefined;

    for (const pid of room?.players?.values()) {
      if (pid == playerId) {
        myCharID = player[pid].char;
      } else {
        otherCharID = player[pid].char;
      }
    }
    socket.nsp
      .to(playerId)
      .emit("get_both_charID_response", { myCharID, otherCharID });
  });

  socket.on("disconnect", () => {
    console.log(`User disconencted: ${socket.id}`);
    const pid = socket.id;
    // clear user data
    player[pid] = undefined;
    for (const roomId of Object.keys(rooms)) {
      rooms[roomId]?.player?.delete(pid);
    }
  });
});

server.listen(3001, () => console.log("SERVER IS RUNNING"));
