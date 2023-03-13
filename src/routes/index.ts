import { Router } from "express";

import getBooks from "./getBooks";
import getCountry from "./getCountry";

const routes = Router();

routes.use("/getTop3ReadBooks", getBooks);
routes.use("/getRandomCountry", getCountry);

export default routes;
