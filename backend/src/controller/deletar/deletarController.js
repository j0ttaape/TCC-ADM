import { Router } from "express";
import { deletarHemocentro } from "../../repository/deletar/deleteRepository.js";


const deletar = Router();

deletar.delete('/deletarHemocentro/:id_hemocentro', async (req,resp) => {
    try {
        let id_hemocentro = req.params.id_hemocentro;
        const registros = await deletarHemocentro(id_hemocentro);
        resp.status(201).send({
            registros
        })
    }
    catch (error) {
        global.logErro(error);
        resp.status(400).send(global.criarErro(error));
    }
} );

export default deletar;