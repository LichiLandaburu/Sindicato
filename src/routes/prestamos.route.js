import { Router } from "express";
import { createPrestamo } from "../controllers/prestamos.controller.js";

const router = Router();

router.post("/", createPrestamo);

export default router;