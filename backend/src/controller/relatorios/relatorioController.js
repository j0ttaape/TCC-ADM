import { Router } from "express";
import { doaçõesSemana } from "../../repository/relatorios/relatoriosRepository.js";

const relatorios = Router();

relatorios.get('/doaçõesSemana', async (req,resp) =>{
    try {
    const id_usuario = req.user && req.user.id_adm

    const quantidade = await doaçõesSemana(id_usuario);

    resp.status(201).send({
        quantidade
    })
    }
    catch (error) {
         global.logErro(error);
            resp.status(400).send(global.criarErro(error));
    }
})

export default relatorios;
