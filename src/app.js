import express from "express";

import producersRoutes from "./routes/producersRoutes.js";

const app = express();

app.use(express.json());
app.use("/producers", producersRoutes);

export default app;
