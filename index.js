import { WebSocketServer } from "ws";
const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    // Relay messages to every other client
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) client.send(msg);
    });
  });
});

console.log("Signaling server running on port", PORT);
