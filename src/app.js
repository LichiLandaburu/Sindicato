import express from "express";
import afiliadosRoutes from "./routes/afiliados.route.js";
import sindicalesRoutes from "./routes/sindicales.route.js";
import prestamosRoutes from "./routes/prestamos.route.js";
import practicasRoutes from "./routes/practicas.route.js";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json()); //va a interpretar las respuestas que nos lleguen en formato json

app.use(morgan("dev"));

app.use(cors());

app.use("/afiliados", afiliadosRoutes);
app.use("/sindicales", sindicalesRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/practicas", practicasRoutes);

export default app;