const socketIo = require("socket.io");
const cron = require("node-cron");

let activeUsers = 0;
let totalActiveUsersInDay = 0;
let totalInteractions = 0;
let maxInteractionTime = 0;
let totalInteractionTimeInDay = 0;

const userConnections = new Map(); // Store connection times for users
        
const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://loalhost:3000", // Allow this origin
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    activeUsers++;
    totalInteractions++;
    totalActiveUsersInDay++;
    const connectTime = Date.now();
    userConnections.set(socket.id, connectTime);

    console.log(`User connected. Total active users: ${activeUsers}`);
    io.emit("activeUsers", activeUsers);

    socket.on("disconnect", () => {
      activeUsers--;
      const disconnectTime = Date.now();
      const interactionTime =
        (disconnectTime - userConnections.get(socket.id)) / 1000;
      userConnections.delete(socket.id);
      totalInteractionTimeInDay += interactionTime;

      if (interactionTime > maxInteractionTime) {
        maxInteractionTime = interactionTime;
      }

      console.log(`User disconnected. Total active users: ${activeUsers}`);
      console.log(`User disconnected. Interaction time : ${interactionTime}s`);
      console.log(
        `User disconnected.Total Interaction time : ${totalInteractionTimeInDay}s`
      );
      io.emit("activeUsers", activeUsers);
    });
  });


  return io;
};

console.log(`Total Interaction time till now ${totalInteractionTimeInDay}s`);

module.exports = setupSocket;
