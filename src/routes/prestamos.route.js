import { Router } from "express";
import { createPrestamo, getPrestamos, setPagado } from "../controllers/prestamos.controller.js";

const router = Router();

router.post("/", createPrestamo);
router.get("/", getPrestamos);
router.delete("/:id_prestamo", getPrestamos)
router.put("/pagado/:id_prestamo", setPagado);

export default router;