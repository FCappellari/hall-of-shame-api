import express from "express";

import { seedDatabase } from "./database/seed.js";
import producersRoutes from "./routes/producersRoutes.js";

await seedDatabase();

const app = express();

app.use(express.json());
app.use("/producers", producersRoutes);

export default app;
