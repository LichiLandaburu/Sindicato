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

export const createPractica = async (req, res) => {
  try {
    const { nro_credencial, fecha_ingreso, practica, fecha_autorizacion, planillas } = req.body;
    if (!nro_credencial || !fecha_ingreso || !practica || !fecha_autorizacion || !planillas) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const practicas = getConnection().data.practicas;
    const createdAt = new Date().toLocaleString();
    const id_practica = generateUUID();
    const nuevaPractica = { id_practica, ...req.body, createdAt };
    practicas.push(nuevaPractica);
    await getConnection().write();
    return res.json(nuevaPractica);
  }
  catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export const getPracticas = async (req, res) => {
  try {
    const practicas = getConnection().data.practicas;
    return res.json({ practicas });  
  } 
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export const getAfiliadoPracticas = async (req, res) => {
  try {
    const { credencial } = req.params;
    const practicas = getConnection().data.practicas;
    const practicasAfiliado = practicas.filter(practica => practica.nro_credencial === parseInt(credencial));
    return res.json({ practicas: practicasAfiliado });
  }
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export const deletePractica = async (req, res) => {
  try {
    const { id_practica } = req.params;
    const practicas = getConnection().data.practicas;
    const practicaEliminada = practicas.find(p => p.id_practica === id_practica);
    const nuevasPracticas = practicas.filter(p => p.id_practica !== id_practica);

    if (!practicaEliminada) return res.status(400).json({ error: "El ID no existe" });

    getConnection().data.practicas = nuevasPracticas;
    await getConnection().write();
    return res.json({ exito: `Practica con el ID ${practicaEliminada.id_practica} eliminada correctamente` });
  }
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export const updatePractica = async (req, res) => {
  try {
    const { id_practica } = req.params;
    const { fecha_ingreso, practica, fecha_autorizacion, planillas } = req.body;
    let practicas = getConnection().data.practicas;  

    let practicaToUpdate = practicas.find(p => p.id_practica === id_practica);
    practicaToUpdate.fecha_ingreso = fecha_ingreso || practicaToUpdate.fecha_ingreso;
    practicaToUpdate.practica = practica || practicaToUpdate.practica;
    practicaToUpdate.fecha_autorizacion = fecha_autorizacion || practicaToUpdate.fecha_autorizacion;
    practicaToUpdate.planillas = planillas || practicaToUpdate.planillas;

    const updatedPracticas = practicas.map(p => p.id_practica === id_practica ? practicaToUpdate : p);

    practicas = [ ...updatedPracticas ];

    await getConnection().write();
    return res.json({ exito: `Practica con el id ${practicaToUpdate.id_practica} actualizada correctamente` });
  } 
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
}