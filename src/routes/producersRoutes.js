import express from "express";
import { getWinnersIntervals } from "../controllers/producersController.js";

const router = express.Router();

router.get("/winners-intervals", getWinnersIntervals);

export default router;
