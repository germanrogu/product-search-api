const express = require("express");
const itemsRoutes = require("./routes/itemsRoutes");

const app = express();
const port = 3000;

// Middleware para analizar solicitudes JSON
app.use(express.json());

app.use("/", itemsRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
