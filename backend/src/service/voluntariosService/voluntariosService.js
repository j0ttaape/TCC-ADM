import { permitirVoluntario, negarVoluntario } from "../../repository/voluntarios/voluntarioRepository.js";
import { validarPermissaoVoluntarios, validarNegarVoluntarios } from "../../validation/voluntarios/voluntariosValidatio.js";


export async function permissaoVoluntariosService(id_adm,nome_voluntario){
    try {
    validarPermissaoVoluntarios(id_adm,nome_voluntario);

    const resposta = await permitirVoluntario(id_adm,nome_voluntario);
    return resposta;
    }
    catch (error) {
        throw error
    }
}

export async function negarVoluntariosService(id_adm,nome_voluntario){
    try {
    validarNegarVoluntarios(id_adm,nome_voluntario);

    const resposta = await negarVoluntario(id_adm,nome_voluntario);
    return resposta;
    }
    catch (error) {
        throw error
    }
}
