// npm run server-router
import express from "express";
import cors    from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";

//
// Variables/Constantes del Modulo
//
const app  = express();
const port = 5000;                  // Puerto en donde levanta express (5000)

//
// Inclusion de los Middlewares
//
app.use(cors());                    // agrego el middleware de CORS
app.use(express.json());            // agrego el middleware para parsear y comprender JSON
app.use(express.static('public'));  // agrego el middleware de retornar archivos estaticos

// 
// Endpoints
//
app.use("/api/pizzas", PizzaRouter);

//
// Levanto el servidor WEB (pongo a escuchar)
//
app.listen(port, () => {
  console.log(`"server-router" Listening on port ${port}`);
});
