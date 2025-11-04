import { Router } from "express";
import { listarVoluntarios, pesquisarVoluntario, editarVoluntario, deletarVoluntario } from "../../repository/voluntarios/voluntarioRepository.js";

const voluntario =  Router();

voluntario.get("/listarVoluntarios", async (req, resp) => {
    try{
        const registros = await listarVoluntarios();
        resp.status(201).send(registros);
    } catch (error) {
        resp.status(500).send({ error: error.message });
    }
});

voluntario.get("/pesquisarVoluntario", async (req, resp) => {
    try{
        const voluntario = req.query.voluntario;
        const registros = await pesquisarVoluntario(voluntario);
        resp.status(201).send(registros);
    } catch (error) {
        resp.status(500).send({ error: error.message });
    }
});

voluntario.put("/editarVoluntario/:id_voluntario", async (req, resp) => {
    try {
        const informacoes = req.body;
        let id_voluntario = req.params.id_voluntario;
        const registros = await editarVoluntario(informacoes, id_voluntario);
        resp.status(201).send({
            registros
        })
    }
    catch (error) {
        resp.status(500).send({ error: error.message });
    }
});

voluntario.delete("/deletarVoluntario/:id_voluntario", async (req, resp) => {
    try {
        let id_voluntario = req.params.id_voluntario;
        const registros = await deletarVoluntario(id_voluntario);
        resp.status(201).send({
            registros
        })
    }
    catch (error) {
        resp.status(500).send({ error: error.message });
    }
});

export default voluntario;
