import { adicionarNoEstoque, retirarDoEstoque, listarEstoqueHemocentro, obterEstoqueAtual } from "../../repository/estoque/estoqueRepository.js";
import validarInserirEstoque, { validarRetirarEstoque } from "../../validation/estoque/estoqueValidation.js"

export async function inserirEstoqueService(infos,id_adm){
    try {
        const estoqueAtual = await obterEstoqueAtual(infos);
        validarInserirEstoque(infos, estoqueAtual);
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