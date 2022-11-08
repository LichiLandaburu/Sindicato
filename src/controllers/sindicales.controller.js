import { getConnection } from "../db.js";

export const getSindicales = (req, res) => {
    try {
        const sindicales = getConnection().data.sindicales;
        return res.json(sindicales);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export const getSindicalByNroAfiliado = (req, res) => {
    try {
        const { nro_afiliado } = req.params;
        const sindicalesByNroAfiliado = getConnection().data.sindicales.filter(sindical => sindical.nro_afiliado === parseInt(nro_afiliado));
        return res.json(sindicalesByNroAfiliado[0]);
    } 
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}