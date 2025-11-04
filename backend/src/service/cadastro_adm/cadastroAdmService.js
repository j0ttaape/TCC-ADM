import { concederPermissao, listarPedidos, loginAdm, negarPermissao, permissaoAdm,  } from "../../repository/cadastro_adm/cadastroAdmRepository.js"
import validarCadastroAdm, { validarConcederPermissao, validarlogarAdm, validarLoginAdm, validarNegarPermissao } from "../../validation/cadastro_adm/cadastroAdmValidation.js";

export async function permissaoAdmService(informacoes){
try {


    validarCadastroAdm(informacoes);
    const mensagem = await permissaoAdm(informacoes);

    return mensagem;
}
catch (error) {
throw error
}

}

export async function listarPedidosService(){
try {
const registros = await listarPedidos();

return registros;
    
} 
catch (error) {
    throw error;
}

}

export async function concederPermissaoService(id_requerido,id_adm){
    try {
    validarConcederPermissao(id_requerido);

    const resposta = await concederPermissao(id_requerido,id_adm);

    return resposta;

    }
    catch (error) {
        throw error
    }
}

export async function negarPermissaoService(id_requerido,id_adm){
    try {
    validarNegarPermissao(id_requerido);

    const resposta = await negarPermissao(id_requerido,id_adm);

    return resposta;

    }
    catch (error) {
        throw error
    }
}


export async function loginADM(requisitos){
    try {
    validarLoginAdm(requisitos);
    
    const registros = await loginAdm(requisitos);

    validarlogarAdm(registros);

    return registros;
    } 
    catch (error) {
        throw error
    }
}