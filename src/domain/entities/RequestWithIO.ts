
import { Request } from "express";
import { Server as SocketIOServer } from "socket.io";

export interface RequestWithIO extends Request {
  io: SocketIOServer;
}
