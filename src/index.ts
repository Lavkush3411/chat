import express from "express";

import http, { IncomingMessage } from "http";
import { config } from "dotenv";

import { appMiddlewares } from "./app.middlewares";

async function main() {
  config();
  const app = express();
  const server = appMiddlewares(app);
  server.listen(3000, () => console.log("started listening on 3000"));
}

main();
