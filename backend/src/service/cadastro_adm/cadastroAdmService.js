import { permissaoAdm, permissoesAdm } from "../../repository/cadstro_adm/cadastroAdmRepository.js"
import validarCadastroAdm, { validarPermissoesAdm } from "../../validation/cadastro_adm/cadastroAdmValidation.js";

export async function permissaoAdmService(informacoes){
try {
    const registros = await permissoesAdm(informacoes);
    validarPermissoesAdm(registros);

    validarCadastroAdm(informacoes);
    const id = await permissaoAdm(informacoes);
    
    return id;
} 
catch (error) {
throw error    
}

}