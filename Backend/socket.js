const socketIo = require("socket.io");
const userModel = require("./models/users.models");
const captainModel = require("./models/captain.model");

let io;

function initializedSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // Restrict this in production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle "join" event
    socket.on("join", async (data) => {
      
      if (!data || !data.userId || !data.userType) {
        console.error("Invalid data received in 'join':", data);
        return;
      }
      
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`Updated socketId for user ${userId}`);
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`Updated socketId for captain ${userId}`);
        } else {
          console.error("Invalid userType provided:", userType);
        }
      } catch (err) {
        console.error(`Error updating socketId for user ${userId}:`, err);
      }
    });

    socket.on("update-location-captain", async (data)=>{
        const { userId , location} = data;
        
        
        if(!location || !location.ltd || !location.lng){
          return socket.emit("error" , {message : "Invalid location data"})
        }
        await captainModel.findByIdAndUpdate(userId , {
          location:{
            ltd: location.ltd,
            lng: location.lng
          }
        })
    })

    // Handle "disconnect" event
    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      try {
        const userResult = await userModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );
        const captainResult = await captainModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: "" } }
        );

        console.log("Cleared socketId for disconnected user/captain:", {
          userResult,
          captainResult,
        });
      } catch (err) {
        console.error(`Error clearing socketId for socket ${socket.id}:`, err);
      }
    });
  });
}

// Function to send a message to a specific socketId
function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized");
  }
}

module.exports = { initializedSocket, sendMessageToSocketId };
