import express from "express";
import http from "http";
import socketIO from "socket.io";

import router from "./routes/index.js";
import { sockets } from "./socket/secets.js";
const port = process.env.PORT || 3001;

const app = express();
app.use(router);

const server = http.createServer(app);
const io = socketIO(server);
sockets(io);
server.listen(port, () => console.log(`Server is listening on port ${port}`));
