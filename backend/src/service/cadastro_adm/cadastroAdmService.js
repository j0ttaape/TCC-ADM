import { permissaoAdm } from "../../repository/cadstro_adm/cadastroAdmRepository.js"
import validarCadastroAdm from "../../validation/cadastro_adm/cadastroAdmValidation.js";

export async function permissaoAdmService(informacoes){
try {
    validarCadastroAdm(informacoes);
    const id = await permissaoAdm(informacoes);
    
    return id;
} 
catch (error) {
throw error    
}

}