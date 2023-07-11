import {Router} from 'express';
import IngredienteXPizzaService from '../services/ingredienteXPizza-services.js';

const IngPorPizzaRouter = Router();
let svc = new IngredienteXPizzaService();

IngPorPizzaRouter.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder
    const listadoIngPorPizza = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    return res.status(200).json(listadoIngPorPizza);
})

IngPorPizzaRouter.get('/GetByIdPizza/:id', async (req,res) =>{
    
        let respuesta;
        const IngPorPizzaID = await svc.GetByIdPizza(req.params.id);
        if (IngPorPizzaID != null) {
            console.log(req.params.id)
            respuesta = res.status(200).json(IngPorPizzaID);
            
        }else{
            respuesta = res.status(404).send("Esta pizza no esxiste");
        }
        return respuesta
})

IngPorPizzaRouter.post('/Insert', async (req,res) =>{

    let body = req.body;
    const IngPorPizzaNuevo = await svc.Insert(body);

    return res.status(201).json(IngPorPizzaNuevo);
})

IngPorPizzaRouter.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    const ingXPizza = await svc.Delete(id);

    return res.status(200).json(ingXPizza);
})

IngPorPizzaRouter.put('/Update/:id', async (req,res) =>{

    let body = req.body;
    let id = req.params.id
    const pizza = await svc.Update(id,body);

    return res.status(200).json(pizza);
})
export default IngPorPizzaRouter;
