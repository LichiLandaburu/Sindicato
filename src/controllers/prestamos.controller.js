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
        const nuevoPrestamo = { id_prestamo, ...req.body, pagado: false, createdAt };
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
        const { id_prestamo } = req.params;    
        const prestamos = getConnection().data.prestamos;
        const prestamoEliminado = prestamos.find(p => p.id_prestamo === parseInt(id_prestamo));
        const nuevosPrestamos = prestamos.filter(p => p.id_prestamo !== parseInt(id_prestamo));

        if (!prestamoEliminado) return res.status(400).json({ error: "El ID no existe" });

        getConnection().data.prestamos = nuevosPrestamos;
        await getConnection().write();
        return res.json({ exito: `Prestamo con el ID ${prestamoEliminado.id_prestamo} eliminado correctamente` });
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const setPagado = async (req, res) => {
    try {
        const { id_prestamo } = req.params;
        const { fecha_prestamo, estado } = req.body;
        let prestamos = getConnection().data.prestamos;

        let prestamo = prestamos.find(p => p.id_prestamo === id_prestamo);
        const fechaACambiar = prestamo.cuotas.find(c => c.fecha === fecha_prestamo);

        fechaACambiar.pagado = estado;

        const updatedPrestamos = prestamos.map(p => p.id_prestamo === id_prestamo ? prestamo : p);

        prestamos = [ ...updatedPrestamos ];

        await getConnection().write();
        return res.json({ exito: `Prestamo con el id ${prestamo.id_prestamo} actualizado correctamente`});
    }
    catch (error) {
        res.status(404).send({ message: error.message });
    }
}