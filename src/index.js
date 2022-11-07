import app from "./app.js";
import { createConnection } from "./db.js";

createConnection();

app.listen(process.env.PORT || 4000);
console.log("Server on port " + process.env.PORT);