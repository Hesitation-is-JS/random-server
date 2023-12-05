import "dotenv/config";
import { createHttpServer, launchHttpServer } from "./httpServer";
import { HTTP_SERVER_PORT } from "./utils/env";
import createDatabaseConnection from "./db";

export const { db, connection } = await createDatabaseConnection();

launchHttpServer(createHttpServer(), HTTP_SERVER_PORT);
