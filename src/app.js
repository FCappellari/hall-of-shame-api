import express from "express";

import { seedDatabase } from "./database/seed.js";

seedDatabase();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

export default app;
