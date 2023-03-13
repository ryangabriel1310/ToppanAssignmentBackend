import "reflect-metadata";
import { DataSource } from "typeorm";

import { dbConfig } from "./config";
import { Authors, AuthorBooks, BookRents, Books, People } from "./entity";

const { type, host, port, username, password, database } = dbConfig;

export const AppDataSource = new DataSource({
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [Authors, AuthorBooks, BookRents, Books, People],
  migrations: [],
  subscribers: [],
});
