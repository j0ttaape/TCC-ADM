import { permitirVoluntario, negarVoluntario, listarVoluntáriosHemocentro } from "../../repository/voluntarios/voluntarioRepository.js";
import { validarPermissaoVoluntarios, validarNegarVoluntarios, validarListarVoluntariosHemocentro } from "../../validation/voluntarios/voluntariosValidatio.js";


export async function permissaoVoluntariosService(id_adm,infos){
    try {
    validarPermissaoVoluntarios(id_adm,infos);

    const resposta = await permitirVoluntario(id_adm,infos);
    return resposta;
    }
    catch (error) {
        throw error
    }
}

export async function negarVoluntariosService(id_adm,infos){
    try {
    validarNegarVoluntarios(id_adm,infos);

    const resposta = await negarVoluntario(id_adm,infos);
    return resposta;
    }
    catch (error) {
        throw error
    }
}

export async function listarVoluntariosHemocentroService(nome_hemocentro){
    try {
    validarListarVoluntariosHemocentro(nome_hemocentro);
    
    const resposta = await listarVoluntáriosHemocentro(nome_hemocentro);

    return resposta;
    } 
    catch (error) {
        throw error
    }
}
