import { Router } from "express";
import { getSindicales } from "../controllers/sindicales.controller.js";

const router = Router();

router.get("/", getSindicales);

export default router;