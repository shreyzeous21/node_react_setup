import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // must match your actual frontend URL exactly
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: [${socket.id}]`);

    socket.on("send_message", (data) => {
      console.log(`Message from [${socket.id}]:`, data);
      io.emit("receive_message", data);
    });

    socket.on("error", (error) => {
      console.error(`Socket error for [${socket.id}]:`, error);
    });

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: [${socket.id}] — ${reason}`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized. Call initSocket first.");
  }
  return io;
}
