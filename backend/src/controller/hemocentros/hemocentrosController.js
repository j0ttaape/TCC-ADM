import { Router } from "express";

import { buscarNomeService, listarHemocentrosService } from "../../service/hemocentros/hemocentrosService.js";

const hemo = Router();



hemo.get('/buscarNome/:nome', async (req,resp) => {
try {
  let nome = req.params.nome;

    const registros = await buscarNomeService(nome);
    resp.status(200).send({
        registros
    })
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

hemo.get('/listarHemocentros', async (req,resp) => {
try {
    const registros = await listarHemocentrosService();
    resp.status(201).send({
        registros
    });

}
catch (error) {
    global.logErro(error);
    resp.status(401).send(global.criarErro(error));
}

})

export default hemo;
