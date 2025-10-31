import Router from "express";
import editarHemocentro from "../../repository/editar/editarRepository.js";

const editar = Router();


editar.put('/editarHemocentro/:id_hemocentro', async (req,resp) => {
    try {
        const informacoes = req.body;
        let id_hemocentro = req.params.id_hemocentro;
        const registros = await editarHemocentro(informacoes, id_hemocentro);
        resp.status(201).send({
            registros
        })
    }
    catch (error) {
        global.logErro(error);
        resp.status(400).send(global.criarErro(error));
    }
} );

export default editar;
