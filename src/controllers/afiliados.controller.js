import { getConnection } from "../db.js";

export const getAfiliados = (req, res) => {
    try {
        const afiliados = getConnection().data.afiliados;
        return res.json(afiliados);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const getAfiliadoByCredencial = (req, res) => {
    try {
        const { credencial } = req.params;
        const afiliadosByCredencial = getConnection().data.afiliados.filter(afiliado => afiliado.nro_credencial === parseInt(credencial));
        return res.json(afiliadosByCredencial[0]);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const createAfiliado = async (req, res) => {
    try {
        const { nro_afiliado, barra, nro_credencial, nombre, apellido, dni, edad, parentesco, fecha_nac, tipo_beneficiario, plan } = req.body;
        if (!nro_afiliado || !barra || !nro_credencial || !nombre || !apellido || !dni || !edad || !parentesco || !fecha_nac || !tipo_beneficiario || !plan) return res.status(400).json({ error: "Faltan campos obligatorios" });
        
        const afiliados = getConnection().data.afiliados;
        
        const afiliadoDuplicado = afiliados.find(afiliado => afiliado.nro_afiliado === nro_afiliado);
        const credencialDuplicada = afiliados.find(afiliado => afiliado.nro_credencial === parseInt(nro_credencial));
        const dniDuplicado = afiliados.find(afiliado => afiliado.dni === parseInt(dni));
        if (afiliadoDuplicado || credencialDuplicada || dniDuplicado) return res.status(400).json({ error: "Información duplicada" }); 
        
        const nuevoAfiliado = { ...req.body };
        afiliados.push(nuevoAfiliado);
        await getConnection().write();
        return res.json(nuevoAfiliado);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const updateAfiliado = async (req, res) => {
    try {
        const { credencial } = req.params;
        const db = getConnection();
        let afiliadoEncontrado = db.data.afiliados.find(afiliado => afiliado.nro_credencial === parseInt(credencial));
        if (!afiliadoEncontrado) return res.status(400).json({ error: "Afiliado no encontrado" });
        afiliadoEncontrado = { ...afiliadoEncontrado, ...req.body };
        // console.log(afiliadoEncontrado);
        const updatedAfiliados = db.data.afiliados.map(afiliado => afiliado.nro_credencial === parseInt(credencial) ? afiliadoEncontrado : afiliado);
        db.data.afiliados = [...updatedAfiliados ];
        // db.data.afiliados.map(afiliado => afiliado.nro_credencial === parseInt(credencial) ? afiliadoEncontrado : afiliado);
        await db.write();
        return res.json({ exito: `Afiliado con la credencial ${afiliadoEncontrado.nro_credencial} actualizado correctamente` });  
    }
    catch (error) {
        return res.status(500).send({ message: error.message });        
    }
}

export const deleteAfiliado = async (req, res) => {
    try {
        const { credencial } = req.params;    
        const afiliados = getConnection().data.afiliados;
        const afiliadoEliminado = afiliados.find(afiliado => afiliado.nro_credencial === parseInt(credencial));
        const nuevosAfiliados = afiliados.filter(afiliado => afiliado.nro_credencial !== parseInt(credencial));

        if (!afiliadoEliminado) return res.status(400).json({ error: "La credencial no esta registrada" });

        getConnection().data.afiliados = nuevosAfiliados;
        await getConnection().write();
        return res.json({ exito: `Afiliado con la credencial ${afiliadoEliminado.nro_credencial} eliminado correctamente` });
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}