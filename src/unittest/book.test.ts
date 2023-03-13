import supertest from "supertest";

import { AppDataSource } from "../dataSource";
import createServer from "../utils/createServer";

const app = createServer();

describe("book", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("get book route", () => {
    describe("given the route does not exist", () => {
      it("should return 404", async () => {
        const { statusCode } = await supertest(app).get(`/api/getTop3ReadBook`);
        expect(statusCode).toBe(404);
      });
    });

    describe("given the country code is not valid", () => {
      it("should return a 400", async () => {
        const countryCode = 123;
        const { statusCode } = await supertest(app).get(`/api/getTop3ReadBooks?country_code=${countryCode}`);
        expect(statusCode).toBe(400);
      });
    });

    describe("given the country code is valid and data exist", () => {
      it("it should return a 200", async () => {
        const { body, statusCode } = await supertest(app).get("/api/getTop3ReadBooks?country_code=ID");
        expect(statusCode).toBe(200);
        expect(body.length).toBeLessThanOrEqual(3);
      });
    });
  });
});
