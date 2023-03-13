import supertest from "supertest";

import { AppDataSource } from "../dataSource";
import createServer from "../utils/createServer";
import countries from "../countries";

const app = createServer();

describe("country", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("get country route", () => {
    describe("given the route does not exist", () => {
      it("should return a 200 and a valid country code", async () => {
        const { statusCode } = await supertest(app).get("/api/getRandomCountries");

        expect(statusCode).toBe(404);
      });
    });

    describe("given the route is correct", () => {
      it("should return a 200 and a valid country code", async () => {
        const { body, statusCode } = await supertest(app).get("/api/getRandomCountry");

        expect(statusCode).toBe(200);

        const isValidCountryCode = countries.map(({ countryCode }) => countryCode).includes(body);
        expect(isValidCountryCode).toBe(true);
      });
    });
  });
});
