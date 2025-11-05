import { Router } from "express";
import { listarVoluntarios, pesquisarVoluntario, editarVoluntario, deletarVoluntario } from "../../repository/voluntarios/voluntarioRepository.js";
import { getAuthentication } from "../../utils/jwt.js";
import { permissaoVoluntariosService, negarVoluntariosService, listarVoluntariosHemocentroService } from "../../service/voluntariosService/voluntariosService.js";

const Autenticador = getAuthentication();
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

voluntario.delete("/deletarVoluntario/:id_voluntario",Autenticador, async (req, resp) => {
    try {
        const id_adm = req.user.id_adm;

        let id_voluntario = req.params.id_voluntario;

        const resposta = await deletarVoluntario(id_adm,id_voluntario);
        resp.status(201).send({
            resposta
        })
    }
    catch (error) {
        resp.status(500).send({ error: error.message });
    }
});

voluntario.put('/permitirVoluntario', Autenticador, async(req,resp) => {
    try {
    const id_adm = req.user.id_adm;
    const infos = req.body;

    const resposta = await permissaoVoluntariosService(id_adm,infos);

    resp.status(201).send({
        resposta
    })
    }
    catch (error) {
         resp.status(500).send({ error: error.message });
    }
} )

voluntario.delete('/negarVoluntario', Autenticador, async(req,resp) => {
    try {
    const id_adm = req.user.id_adm;
    const infos = req.body;

    const resposta = await negarVoluntariosService(id_adm,infos);

    resp.status(201).send({
        resposta
    })
    }
    catch (error) {
         resp.status(500).send({ error: error.message });
    }
} );

voluntario. post('/listarVoluntariosHemocentro', async(req,resp) => {
try {
const nome_hemocentro = req.body.nome_hemocentro;

const resposta = await listarVoluntariosHemocentroService(nome_hemocentro);

resp.status(201).send({
    resposta
});
} 
catch (error) {
    resp.status(500).send({ error: error.message });
}

})

export default voluntario;
