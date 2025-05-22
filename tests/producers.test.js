import request from "supertest";
import app from "../src/app.js";
import { seedDatabase } from "../src/database/seed.js";

beforeAll(async () => {
  await seedDatabase();
});

describe("GET producers/winners-intervals", () => {
  it("should return status 200 and the correct object structure", async () => {
    const response = await request(app).get("/producers/winners-intervals");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("min");
    expect(response.body).toHaveProperty("max");
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
  });

  it("should return the intervals with the correct properties", async () => {
    const response = await request(app).get("/producers/winners-intervals");
    const allItems = [...response.body.min, ...response.body.max];

    allItems.forEach((item) => {
      expect(item).toHaveProperty("producer");
      expect(item).toHaveProperty("interval");
      expect(item).toHaveProperty("previousWin");
      expect(item).toHaveProperty("followingWin");
    });
  });
});
