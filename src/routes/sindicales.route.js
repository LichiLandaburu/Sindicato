import { Router } from "express";
import { getSindicales } from "../controllers/sindicales.controller";

const router = Router();

router.get("/", getSindicales);

export default router;