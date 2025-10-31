import { Router } from "express";
import { buscarUser, deletarAgendaUser, listarUser } from "../../repository/gerenciarDoadors/gerenciarUserRepository.js";

const gerenciarUser = Router();

gerenciarUser.get('/listarDoadores', async (req,resp) => {
    try{
        const registros = await listarUser();
        resp.status(200).send(registros);
        } catch(err){
            global.logErro(err);
            resp.status(400).send(global.criarErro(err));
        }
})

gerenciarUser.get('/BuscarCpf/:cpf', async (req,resp) => {
    try{
        let cpf = req.params.cpf;
        const registros = await buscarUser(cpf);
        resp.status(200).send(registros);
        } catch(err){
            global.logErro(err);
            resp.status(400).send(global.criarErro(err));
        }
})

gerenciarUser.delete('/deletarDoadores/:id', async (req,resp) => {
    try{
        let id = req.params.id;
        const registros = await deletarAgendaUser(id);
        resp.status(200).send(registros);
        } catch(err){
            global.logErro(err);
            resp.status(400).send(global.criarErro(err));
        }
})

export default gerenciarUser;
