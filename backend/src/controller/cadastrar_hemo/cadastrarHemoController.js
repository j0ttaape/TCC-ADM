import { Router } from "express";
import cadastrarHemocentroService from "../../service/cadastrarHemo/cadastrarHemoService.js";

const cadHemo= Router();



cadHemo.post('/cadastrarHemocentro', async (req,resp) => {
    try {
        const informacoes = req.body;
        const id = await cadastrarHemocentroService(informacoes);
        resp.status(201).send({id});
    } 
    catch (error) {
        global.logErro(error);
        resp.status(400).send(global.criarErro(error));
    }
} );

export default cadHemo;