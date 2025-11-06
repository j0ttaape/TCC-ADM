import { adicionarNoEstoque, retirarDoEstoque, listarEstoqueHemocentro } from "../../repository/estoque/estoqueRepository.js";
import validarInserirEstoque, { validarRetirarEstoque } from "../../validation/estoque/estoqueValidation.js"

export async function inserirEstoqueService(infos,id_adm){
    try {
        validarInserirEstoque(infos);
        const mensagem = await adicionarNoEstoque(infos);

        return mensagem;
    }
    catch (error) {
        throw error;
    }
}

export async function retirarEstoqueService(infos,id_adm){
    try {
        validarRetirarEstoque(infos);
        const mensagem = await retirarDoEstoque(infos);

        return mensagem;
    }
    catch (error) {
        throw error;
    }
}

export async function listarEstoqueService(nome_hemo){
    try {
        const estoque = await listarEstoqueHemocentro(nome_hemo);
        return estoque;
    }
    catch (error) {
        throw error;
    }
}