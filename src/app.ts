import { appConfig } from "./config";
import { AppDataSource } from "./dataSource";
import createServer from "./utils/createServer";

const { port } = appConfig;

const app = createServer();
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await AppDataSource.initialize();
});
