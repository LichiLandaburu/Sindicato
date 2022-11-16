import { Router } from "express";
import { createPrestamo, getPrestamos } from "../controllers/prestamos.controller.js";

const router = Router();

router.post("/", createPrestamo);
router.get("/", getPrestamos);
router.delete("/:nro", getPrestamos);

export default router;