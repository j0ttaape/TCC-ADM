import { Router } from "express";
import { adicionarSemanaService, adicionarDiaService, listarAgendaService } from "../../../service/hemocentros/agenda/agendaDisponivelService.js";


const age = Router();

age.post('/adicionarSemana', async (req,resp) => {
try {
    const requisitos = req.body;

    const rows = await adicionarSemanaService(requisitos);

    resp.status(201).send({
        mensagem:"Horarios da semana inseridos",
        rows
    });
}
catch (error) {
    global.logErro(error);
    resp.status(401).send(global.criarErro(error));
}

})

age.post('/adicionarDia', async (req,resp) => {
try {
    const requisitos = req.body;

    const rows = await adicionarDiaService(requisitos);

    resp.status(201).send({
        mensagem:"Horarios do dia inseridos",
        rows
    });
}
catch (error) {
    global.logErro(error);
    resp.status(401).send(global.criarErro(error));
}

})

age.get('/listarAgenda/:nomeHemo', async(req,resp) => {
try {
const nome = req.params.nomeHemo;

const registros = await listarAgendaService(nome);
    
resp.status(201).send({
    registros
}) 
} 
catch (error) {
    global.logErro(error);
    resp.status(401).send(global.criarErro(error));
}

})


export default age;
