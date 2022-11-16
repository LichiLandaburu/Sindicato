import { getConnection } from "../db.js";

export const createPrestamo = async (req, res) => {
    try {
        const { nro_afiliado, monto, cant_cuotas, interes } = req.body;
        if (!nro_afiliado || !monto || !cant_cuotas || !interes) return res.status(400).json({ error: "Faltan campos obligatorios" });
        
        const prestamos = getConnection().data.prestamos;
                
        const createdAt = new Date().toLocaleDateString();
        const nuevoPrestamo = { ...req.body, createdAt };
        prestamos.push(nuevoPrestamo);
        await getConnection().write();
        return res.json(nuevoPrestamo);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}