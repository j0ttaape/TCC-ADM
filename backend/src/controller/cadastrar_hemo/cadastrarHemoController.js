import { Router } from "express";
import cadastrarHemocentro from "../../repository/cadastrar_hemo/cadastrarHemoRepository.js";

const cad = Router();

cad.post('/cadastrarHemocentro', async (req,resp) => {
    try {
        const informacoes = req.body;
        const id = await cadastrarHemocentro(informacoes);
        resp.status(201).send({id});
    } 
    catch (error) {
        global.logErro(error);
        resp.status(400).send(global.criarErro(error));
    }
} );

export default cad