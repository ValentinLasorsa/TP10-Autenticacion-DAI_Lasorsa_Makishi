import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import UsuarioService from '../services/usuarios-services.js';

const router = Router();
const svc = new UsuarioService();

router.post('/Login/', async (req, res) => {
    let body = req.body;
    console.log(body);
    const newLogin = await svc.login(body) 
    return res.status(200).json(newLogin);
    }
);


export default router;