import React from "react";
import { socket } from "@/lib/socket";

export default function HomePage() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    function onReceiveMessage(data) {
      console.log("Received:", data);
    }

    socket.on("receive_message", onReceiveMessage);

    return () => {
      socket.off("receive_message", onReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      senderId: "123",
      receiverId: "456",
      message,
    });
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
