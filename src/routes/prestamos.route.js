import { Router } from "express";
import { createPrestamo, getPrestamos } from "../controllers/prestamos.controller.js";

const router = Router();

router.post("/", createPrestamo);
router.get("/", getPrestamos);
router.delete("/:id_prestamo", getPrestamos)
// router.put("/pegado/:id_prestamo", setPagado);

export default router;