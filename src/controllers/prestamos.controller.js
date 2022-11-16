import { getConnection } from "../db.js";

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export const createPrestamo = async (req, res) => {
    try {
        const { nro_afiliado, monto, cant_cuotas, interes } = req.body;
        if (!nro_afiliado || !monto || !cant_cuotas || !interes) return res.status(400).json({ error: "Faltan campos obligatorios" });
        
        const prestamos = getConnection().data.prestamos;
        const createdAt = new Date().toLocaleString();
        const id_prestamo = generateUUID();
        const nuevoPrestamo = { id_prestamo, ...req.body, createdAt };
        prestamos.push(nuevoPrestamo);
        await getConnection().write();
        return res.json(nuevoPrestamo);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

export const getPrestamos = async (req, res) => {
    try {
        const prestamos = getConnection().data.prestamos;
        return res.json(prestamos);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const deletePrestamo = async (req, res) => {
    try {
        const { nro } = req.params;    
        const prestamos = getConnection().data.prestamos;
        const prestamoEliminado = prestamos.find(p => p.createdAt === nro);
        const nuevosPrestamos = prestamos.filter(p => p.createdAt !== nro);

        // if (!afiliadoEliminado) return res.status(400).json({ error: "La credencial no esta registrada" });

        getConnection().data.prestamos = nuevosPrestamos;
        await getConnection().write();
        return res.json({ exito: `Prestamo con la credencial ${prestamoEliminado.createdAt} eliminado correctamente` });
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}