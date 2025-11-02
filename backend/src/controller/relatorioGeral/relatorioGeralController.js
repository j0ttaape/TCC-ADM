import { Router } from "express";
import { relatorioGeralAgendamentos, relatorioGeralBolsas, relatorioGeralCadastros, relatorioGeralHemocentros } from "../../repository/relatorioGeral/relatorioGeralRepository.js";

const relatorioGeral = Router();


relatorioGeral.get('/relatorioGeral/cadastros', async (req,resp) => {
    try{
        const registros = await relatorioGeralCadastros();
        resp.status(200).send(registros);
        } catch(err){
            global.logErro(err);
            resp.status(400).send(global.criarErro(err));
        }
})

relatorioGeral.get("/relatorioGeral/hemocentros", async (req,resp) => {
    try{
        let registros = await relatorioGeralHemocentros();
        resp.status(200).send(registros);
    } catch(err){
        global.logErro(err);
        resp.status(400).send(global.criarErro(err));
    }
})

relatorioGeral.get("/relatorioGeral/agendamentos", async (req,resp) => {
    try{
        let registros = await relatorioGeralAgendamentos();
        resp.status(200).send(registros);
    } catch(err){
        global.logErro(err);
        resp.status(400).send(global.criarErro(err));
    }
})

relatorioGeral.get('/relatorioQuantidadeBolsas', async(req,resp) => {
    try {
    const registros = await relatorioGeralBolsas();

    resp.status(200).send({
        registros
    })
    }
    catch (error) {
        global.logErro(error);
        resp.status(400).send(global.criarErro(error));

    }
})

export default relatorioGeral;