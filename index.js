const path = require("path");
const { createServer } = require("http");

const express = require("express");
const { getIO, initIO } = require("./socket");

const app = express();

let port = process.env.PORT || 3500;
const httpServer = createServer(app);

initIO(httpServer);
// app.use('/', express.static(path.join(__dirname, 'static')));

app.get("/api", (req, res) => {
  res.json("server running successfully.");
});

httpServer.listen(port);
console.log("Server started on ", port);
getIO();
