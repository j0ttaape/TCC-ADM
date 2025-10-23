import { Router } from "express";
import { adicionarSemanaService, adicionarDiaService, listarAgendaService, listarMesesService, listarDatasPorMesService, listarHorariosPorDataService, deletarDiaAgendaService, deletarHorarioAgendaService } from "../../../service/hemocentros/agenda/agendaDisponivelService.js";


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

age.get('/listarMeses/:nomeHemo', async(req,resp) => {
try {
const nome = req.params.nomeHemo;

const registros = await listarMesesService(nome);

resp.status(200).send({
    registros
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

age.get('/listarDatas/:nomeHemo/:mes', async(req,resp) => {
try {
const nome = req.params.nomeHemo;
const mes = req.params.mes;

const registros = await listarDatasPorMesService(nome, mes);

resp.status(200).send({
    registros
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

age.post('/listarHorarios/:nomeHemo', async(req,resp) => {
try {
const nome = req.params.nomeHemo;
const data = req.body.data

const registros = await listarHorariosPorDataService(nome, data);

resp.status(200).send({
    registros
})
}
catch (error) {
    global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

age.delete('/deletarDiaAgenda/:nomeHemo', async (req,resp) => {
try {
  const nome = req.params.nomeHemo;
  const data = req.body.data;

const affectedRows = await deletarDiaAgendaService(nome,data);

  resp.status(200).send({
    mensagem: "Dia removido da agenda com sucesso",
    affectedRows
  })
}
catch (error) {
     global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})

age.delete('/deletarHorarioAgenda/:nomeHemo', async (req,resp) => {
try {
  const nome = req.params.nomeHemo;
  const data = req.body.data;
  const horario = req.body.horario;

const affectedRows = await deletarHorarioAgendaService(nome, data, horario);

  resp.status(200).send({
    mensagem: "Horário removido da agenda com sucesso",
    affectedRows
  })
}
catch (error) {
     global.logErro(error);
    resp.status(400).send(global.criarErro(error));
}

})


export default age;
