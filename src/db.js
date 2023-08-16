import { Low, JSONFile } from "lowdb";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

let db;

const __dirname = dirname(fileURLToPath(import.meta.url)); //de esta manera obtenemos el directorio, esto seria como usar el __dirname de siempre, pero como estamos usando imports/exports lo vamos a tener que hacer de esta manera

export async function createConnection() { 
    const file = join(__dirname, "../db.json"); //el join nos va a servir para todos los sistemas operativos, ya que las rutas son distintas 
    const adapter = new JSONFile(file); //jsonfile espera una ruta absoluta, es decir C:/...
    db = new Low(adapter);
    await db.read();
    db.data = db.data || { afiliados: [], sindicales: [], prestamos: [] }; //esto seria lo mismo que hacer db.data = db.data || {tasks: []}
    await db.write();
}

export const getConnection = () => db;
