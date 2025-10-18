import cadastrarHemocentro from "../../repository/cadastrar_hemo/cadastrarHemoRepository.js";
import validarCadastroHemocentro from "../../validation/cadastrarHemo/cadastrarHemoValidation.js";

export default async function cadastrarHemocentroService(informacoes){

    try {
        validarCadastroHemocentro(informacoes);
        let id = await cadastrarHemocentro(informacoes);
        return id;
    } 
    catch (error) {
        throw error;
    }


}