import app from "./app.js";
import { createConnection } from "./db.js";

createConnection();

app.listen(4000);
console.log("Server on port 4000");