import { errorHandler } from "./_common/middlewares/error.middleware";
import { responseWrapper } from "./_common/middlewares/response.middleware";
import { socketHandler } from "./socket/socket.handler";
import Websocket from "ws";
import express, { Express } from "express";
import http, { Server } from "http";
import { dbConnection } from "./db/db.connection";
import { userRouter } from "./user/user.controller";
import { initializeTopics } from "./kafka/topic-initialization";
import { startProducer } from "./kafka/producer";
import { startConsumer } from "./kafka/consumer";

export const appMiddlewares = async (app: Express): Promise<Server> => {
  /**
   * add global middlewares
   */
  await dbConnection();
  await initializeTopics();
  await startProducer();
  await startConsumer();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(responseWrapper);

  /**
   * add routers
   */
  app.use("/user", userRouter);

  /**
   * end routers
   * ==========================
   */

  /**
   * create http server using express app
   */
  const server = http.createServer(app);

  /**
   * pass http to websocket server
   */
  const wss = new Websocket.Server({ server });
  /**
   * attach socket events
   */
  wss.on("connection", socketHandler);

  wss.on("close", (socket: any, req: any) => {
    console.log("connection dropped");
  });

  /**
   * insert global error handler
   */
  app.use(errorHandler);

  /**
   * finally return http server
   */
  return server;
};
