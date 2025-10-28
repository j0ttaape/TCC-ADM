import { adicionarNoEstoque, retirarDoEstoque } from "../../repository/estoque/estoqueRepository.js";
import validarInserirEstoque, { validarRetirarEstoque } from "../../validation/estoque/estoqueValidation.js"

export async function inserirEstoqueService(infos,id_adm){
    try {
        validarInserirEstoque(infos);
        const mensagem = await adicionarNoEstoque(infos,id_adm);

        return mensagem;
    }
    catch (error) {
    throw error
    }
}

export async function retirarEstoqueService(infos,id_adm){
    try {
        validarRetirarEstoque(infos);
        const mensagem = await retirarDoEstoque(infos,id_adm);

        return mensagem;
    }
    catch (error) {
    throw error
    }
}
