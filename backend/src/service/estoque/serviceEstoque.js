import { adicionarNoEstoque } from "../../repository/estoque/estoqueRepository.js";
import validarInserirEstoque from "../../validation/estoque/estoqueValidation.js"

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