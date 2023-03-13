import { Request, Response, Router } from "express";
import countries from "../countries";

async function getCountry(req: Request, res: Response) {
  const randomCountryCode = countries[Math.floor(Math.random() * countries.length)].countryCode;
  return res.json(randomCountryCode);
}

const router = Router();

router.get("/", getCountry);

export default router;
