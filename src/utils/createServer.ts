import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";

import routes from "../routes";

export default function createServer() {
  // Initialize an express app
  const app = express();

  // Apply middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Register routes to the server
  app.use("/api", routes);

  return app;
}
