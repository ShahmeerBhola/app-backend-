// const path = require("path");
// const { createServer } = require("http");

// const express = require("express");
// const { getIO, initIO } = require("./socket");

// const app = express();

// let port = process.env.PORT || 3500;
// const httpServer = createServer(app);

// initIO(httpServer);
// // app.use('/', express.static(path.join(__dirname, 'static')));

// app.get("/api", (req, res) => {
//   res.json("server running successfully.");
// });

// httpServer.listen(port);
// console.log("Server started on ", port);

// getIO();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// app.use(express.static(__dirname + '/public'));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (room) => {
    console.log("User joined room:", room);
    socket.join(room);
  });

  socket.on("offer", (room, offer) => {
    console.log("Received offer from user in room", room);
    socket.to(room).emit("offer", offer);
  });

  socket.on("answer", (room, answer) => {
    console.log("Received answer from user in room", room);
    socket.to(room).emit("answer", answer);
  });

  socket.on("ice", (room, candidate) => {
    console.log("Received ICE candidate from user in room", room);
    socket.to(room).emit("ice", candidate);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
