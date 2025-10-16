import { Router } from "express";
import { generateToken } from "../../utils/jwt.js";
import { permissaoAdmService } from "../../service/cadastro_adm/cadastroAdmService.js";

const cad = Router();

cad.post('/pedirPermissao', async(req,resp) => {
    try {
        
        const informacoes = req.body;
    
        const id = await permissaoAdmService(informacoes);
    
        const token = generateToken(informacoes);

        resp.status(201).send({
            id,
            token
        })
    } 
    catch (error) {
         global.logErro(error);
    resp.status(401).send(global.criarErro(error));
    }


} )

export default cad;