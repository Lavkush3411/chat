import express from "express";
import "module-alias/register";
import { config } from "dotenv";
import { appMiddlewares } from "./app.middlewares";

async function main() {
  config();
  const app = express();
  const server = appMiddlewares(app);
  server.listen(3001, () => console.log("started listening on 3001"));
}

main();
