// npm run server
import express from "express";
import cors    from "cors";
import PizzaService from './src/services/pizzas-services.js'

//
// Variables/Constantes del Modulo
//
const app  = express();
const port = 5000;                  // Puerto en donde levanta express (5000)
const pizzaService = new PizzaService();

//
// Inclusion de los Middlewares
//
app.use(cors());                    // agrego el middleware de CORS
app.use(express.json());            // agrego el middleware para parsear y comprender JSON
app.use(express.static('public'));  // agrego el middleware de retornar archivos estaticos

// 
// Endpoints
//
app.get('/api/pizzas', async (req, res) => {
  console.log('Estoy en: pizzaController get /');
  
  const pizzas = await pizzaService.getAll();

  //return res.status(StatusCodes.OK).json(pizzas);
  return res.status(200).json(pizzas);
});

app.get('/api/pizzas/:id', async (req, res) => {
  console.log('Estoy en: pizzaController get /:id', req.params.id);
  let respuesta;
  
  const pizza = await pizzaService.getById(req.params.id);
  console.log('pizza', pizza);
  if (pizza!=null){
    console.log('1');
    respuesta = res.status(200).json(pizza);
  } else {
    console.log('2');
    respuesta = res.status(404).send("No se encontro la Pizza.");
  }

  return respuesta;
});

app.post('/api/pizzas', async (req, res) => {
  console.log('Estoy en: pizzaController post /', req.body);

  const pizza = await pizzaService.insert(req.body);

  return res.status(201).json(pizza);
});

app.put('/api/pizzas/:id', async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log('Estoy en: pizzaController put /:id');

  const pizza = await pizzaService.update(req.body);

  return res.status(200).json(pizza);
});

app.delete('/api/pizzas/:id', async (req, res) => {
  console.log('Estoy en: pizzaController delete /:id', req.params.id);

  const pizza = await pizzaService.deleteById(req.params.id);

  return res.status(200).json(pizza);
});

//
// Levanto el servidor WEB (pongo a escuchar)
//
app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
});
