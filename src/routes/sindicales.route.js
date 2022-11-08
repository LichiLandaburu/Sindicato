import { Router } from "express";
import { getSindicalByNroAfiliado, getSindicales } from "../controllers/sindicales.controller.js";

const router = Router();

router.get("/", getSindicales);
router.get("/:nro_afiliado", getSindicalByNroAfiliado);

export default router;