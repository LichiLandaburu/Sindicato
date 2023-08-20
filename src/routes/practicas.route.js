import { Router } from "express";
import { createPractica, deletePractica, getAfiliadoPracticas, getPracticas, updatePractica } from "../controllers/practicas.controller.js";

const router = Router();

router.get("/", getPracticas);

router.get("/:credencial", getAfiliadoPracticas);

router.post("/", createPractica);

router.patch("/:id_practica", updatePractica);

router.delete("/:id_practica", deletePractica);

export default router;