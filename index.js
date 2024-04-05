import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import http from "http";
import connectDb from "./db/db.js";
import userRouter from "./routes/userRoutes.js";
import classRouter from "./routes/classRoutes.js";
import AssignmentSubmitRouter from "./routes/AssignmentSubmitRoutes.js";

// config
dotenv.config();

// app
const app = express();

// create server with http
const server = new http.createServer(app);

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/class', classRouter)
app.use('/api/v1/submit', AssignmentSubmitRouter)

// homepage
app.get("/", (req, res) => {
  res.send("chat application server is running");
});

// port
const port = process.env.PORT || 5000;

// listen server
server.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}`.cyan.bold);
});
