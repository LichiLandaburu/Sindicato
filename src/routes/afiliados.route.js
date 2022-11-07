import { Router } from "express";
import { createAfiliado, deleteAfiliado, getAfiliadoByCredencial, getAfiliados, updateAfiliado } from "../controllers/afiliados.controller.js";

const router = Router();

router.get("/", getAfiliados);

router.get("/:credencial", getAfiliadoByCredencial);

router.post("/", createAfiliado);

router.put("/:credencial", updateAfiliado);

router.delete("/:credencial", deleteAfiliado);

export default router;