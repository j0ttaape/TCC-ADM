import { Router } from "express";
import { getAuthentication } from "../../utils/jwt.js";
import { inserirEstoqueService } from "../../service/estoque/serviceEstoque.js";

const estoque = Router();
const Autenticador = getAuthentication();

estoque.post('/inserirEstoque', Autenticador, async(req,resp) => {
try {
const infos = req.body;
const id_adm = req.user && req.user.id_adm;

const mensagem = await inserirEstoqueService(infos,id_adm);

resp.status(201).send({
    mensagem
})
} 
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

export default estoque;
