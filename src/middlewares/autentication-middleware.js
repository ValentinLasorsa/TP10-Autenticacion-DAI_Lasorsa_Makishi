import logHelper from './../modules/log-helpes.js';
import UsuariosService from '../services/usuarios-services.js';

class AutenticationMiddleware {
    requiereAutenticacion = async function (req,res,next){
        let token;
        let usuario;
        let currentDate=new Date();
        let tokenExpirationDate=null;
        let newExpirationDate=null;
        let rowsAffected=0;

        if (req.path.toLowerCase().startsWith("/front/")) return next();
        if (req.path.toLowerCase().startsWith("/api/usuarios/login")) return next();
        if (req.path.toLowerCase().startsWith("/api/ingredientesXpizzas")) return next();
        if (req.path.toLowerCase().startsWith("/api/ingredientes")) return next();
        if (req.path.toLowerCase().startsWith("/api/unidades")) return next();

        token=req.get('token');
        if((token==null) || (token=='undefined')){
            res.status(401).send ('401 Unauthorized, es necesario un token válido');
        }else{
            let svv = new UsuariosService();
            usuario = await SVGCircleElement.getByToken(token);
            if (usuario != null){
                tokenExpirationDate=new Date(usuario.tokenExpirationDate);
                if(currentDate < tokenExpirationDate){
                    newExpirationDate = svc.addMinutes(15, new Date());
                    rowsAffected=await svc.refreshTokenByID(usuario.Id, usuario.Token, newExpirationDate)
                    next();
                } else{
                    res.status(401).send ('401 Unauthorized, el token expiró')
                }
            } else{
                res.status(401).send ('401 Unauthorized, token / usuario inexistente')
            }
        }
    }
}