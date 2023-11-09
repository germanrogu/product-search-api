const express = require("express");
const cors = require("cors");
const itemsRoutes = require("./routes/itemsRoutes");

const app = express();
app.use(cors());
const port = 4000;

// Middleware para analizar solicitudes JSON
app.use(express.json());

app.use("/", itemsRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
