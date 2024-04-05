import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import classRouter from "./routes/classRoutes.js";
import AssignmentSubmitRouter from "./routes/AssignmentSubmitRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";

// CONFIG
dotenv.config();

// APP
const app = express();
const server = createServer(app);


// MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/v1/user', userRouter)
app.use('/api/v1/class', classRouter)
app.use('/api/v1/submit', AssignmentSubmitRouter)

// HOME PAGE
app.get("/", (req, res) => {
  res.send("chat application server is running");
});


// SOCKET
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//CREATE CONNNECTION
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);



  // SINGLE CHAT
  // socket.on("message", ({ room, message }) => {
  //   console.log({ room, message });
  //   socket.to(room).emit("receive-message", message);
  // });

  // GROUP CHAT
  // socket.on("join-room", (room) => {
  //   socket.join(room);
  //   console.log(`user joined room ${room}`);
  // });

  // DISCONNECT
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
});






// PORT
const port = process.env.PORT || 5000;

// SERVER LISTEN
server.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}`.cyan.bold);
});
