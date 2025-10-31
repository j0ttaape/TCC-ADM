import { Router } from "express";
import { inserirEstoqueService, retirarEstoqueService, listarEstoqueService } from "../../service/estoque/serviceEstoque.js";

const estoque = Router();

estoque.put('/adicionarEstoque', async(req,resp) => {
try {
const infos = req.body;

const mensagem = await inserirEstoqueService(infos);

resp.status(201).send({
    mensagem
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

estoque.put('/retirarEstoque', async(req,resp) => {
try {
const infos = req.body;

const mensagem = await retirarEstoqueService(infos);

resp.status(201).send({
    mensagem
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

estoque.get('/listarEstoque/:nome_hemo', async(req,resp) => {
try {
const nome_hemo = req.params.nome_hemo;
const id_adm = req.user && req.user.id_adm;

const registros = await listarEstoqueService(nome_hemo);

resp.status(200).send({
    registros
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

export default estoque;
