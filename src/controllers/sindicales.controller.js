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
