import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  socket.emit("request", "hello"); // emit an event to the socket
  io.emit("broadcast", "hello"); // emit an event to all connected sockets
  socket.on("reply", () => {
    // listen to the event
    console.log("reply received");
  });
});
