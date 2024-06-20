import dotenv from "dotenv";
import cors from "cors";
import express from "express";

import path from "path";
import logger from "morgan";
import http from 'http';
import { Server } from "socket.io";

import mongodb from "./common/connection";
import router from "./routes/index";
import setupSocket from "./helper/socket";

const app = express();
const port = 4220;
dotenv.config();

app.use("/", express.static(path.join(__dirname, "../public")));
// app.use("../assets", express.static("../assets"));

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(logger("dev"));

app.use("/", router());


const httpServer = http.createServer(app);
const io = new Server(httpServer);

httpServer.listen(() => {
  // Start the HTTP server
  console.log(`Application listening on port ${port}!`);
  setupSocket(io);
  mongodb();
});

httpServer.on('error', (e) => {
  console.log(e);
  
});