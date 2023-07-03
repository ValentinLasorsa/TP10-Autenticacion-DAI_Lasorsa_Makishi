import config from "./dbconfig.js";
import sql from 'mssql';
import express from "express";
import PizzaService from "./src/services/pizzas-services.js";

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const pizzaService = new PizzaService();
    const pizzas = await pizzaService.getAll();
    res.json(pizzas);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); 