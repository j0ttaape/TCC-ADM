import { Router } from "express";
import { generateToken } from "../../utils/jwt.js";
import { concederPermissaoService, listarPedidosService, loginADM, permissaoAdmService } from "../../service/cadastro_adm/cadastroAdmService.js";
import { getAuthentication } from "../../utils/jwt.js";

const cad = Router();
const Autenticador = getAuthentication();

cad.put('/pedirPermissao', async(req,resp) => {
    try {

        const informacoes = req.body;

        const mensagem = await permissaoAdmService(informacoes);

        resp.status(201).send({
            mensagem,

        })
    }
    catch (error) {
         global.logErro(error);
    resp.status(401).send(global.criarErro(error));
    }


} );

cad.get('/listarPedidos', async (req,resp) => {

    try {
        const registros = await listarPedidosService();

        resp.status(201).send({
            registros
        });
    }
    catch (error) {
        global.logErro(error);
        resp.status(401).send(global.criarErro(error));

    }

})

cad.put('/concederPermissao',Autenticador, async(req,resp) => {
try {
const id_requerido = req.body.id_requerido;
const id_adm = req.user && req.user.id_adm;

if (!id_adm) {
    return resp.status(401).send({ erro: 'Token inválido ou usuário não identificado' });
}

const resposta = await concederPermissaoService(id_requerido,id_adm);

resp.status(201).send({
    resposta
})
}
catch (error) {
        global.logErro(error);
        resp.status(401).send(global.criarErro(error));

}

})

cad.post('/loginAdm', async (req,resp) => {
try {
const requisitos = req.body;
 const logado = await loginADM(requisitos);

 const token = generateToken(logado[0]);
 resp.status(201).send({
    token,
    mensagem: 'ADM logado'
 })

}
catch (error) {
    global.logErro(error);
    resp.status(401).send(global.criarErro(error));

}

})

export default cad;
