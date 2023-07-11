import { Router } from 'express';
import PizzaService from '../services/pizzas-services.js';


const PIzzaRouter = Router();
const svcPizza = new PizzaService();

PIzzaRouter.get('/GetAll/', async (req, res) => {
    let top                     = req.query.top
    let orderField              = req.query.orderField
    let sortOrder               = req.query.sortOrder
    let ing     = (typeof req.query.ing !== 'undefined' && req.query.ing.toLowerCase() === 'true')
    let uni         = (typeof req.query.uni !== 'undefined' && req.query.uni.toLowerCase() === 'true')


    console.log(typeof(ing))
    const listadoPizzas = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder),ing,uni)
    
    return res.status(200).json(listadoPizzas);
    }
);

PIzzaRouter.get('/GetById/:id', async (req, res) => {
    let rta;
    let ing     = (typeof req.query.ing !== 'undefined' && req.query.ing.toLowerCase() === 'true')
    let uni         = (typeof req.query.uni !== 'undefined' && req.query.uni.toLowerCase() === 'true')
    
    const pizzaXID = await svc.GetByID(req.params.id, ing,uni);
    if (pizzaXID != null) {
        respuesta = res.status(200).json(pizzaXID);
    }else{
        respuesta = res.status(404).send("La pizza no es válida");
    }
    return rta
})

PIzzaRouter.post('/Insert', async (req, res) => {
    let body = req.body;
    const pizzaNueva = await svc.Insert(body);

    return res.status(201).json(pizzaNueva);
})

PIzzaRouter.put('/Update/:id', async (req, res) => {
    let body = req.body;
    let id = req.params.id
    const pizza = await svc.Update(id,body);

    return res.status(200).json(pizza);
})
;

PIzzaRouter.delete('/Delete/:id', async function(req, res) {
    let id = req.params.id
    const pizza = await svc.Delete(id);

    return res.status(200).json(pizza);
})
;

export default PIzzaRouter;