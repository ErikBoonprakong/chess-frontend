const express = require("express")();
const app = express();
app.use(express.static("public"));
const http = require("http").Server(app);
const port = process.env.PORT || 3002;

// set up socket server

let io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("message", (msg) => {
    console.log("Got message from client: " + msg);
  });
});

app.get("/", (req, res) => res.sendFile(__dirname + "../public/default.html"));

http.listen(port, () => {
  console.log("Listening on *: " + port);
});
