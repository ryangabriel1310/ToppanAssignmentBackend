import { DataSourceOptions } from "typeorm";

type appConfigType = {
  port: number;
};
const appConfig: appConfigType = {
  port: 5000,
};

const dbConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "superuser",
  database: "toppan",
} satisfies DataSourceOptions;

export { appConfig, dbConfig };
