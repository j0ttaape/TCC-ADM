import { buscarHemocentros, listarHemocentros } from "../../repository/hemocentros/hemocentrosRepository.js";
import validarBuscaNome from "../../validation/hemocentro/hemocentrosValidation.js";


export async function buscarNomeService(nome){
try {
    const registros = await buscarHemocentros(nome);
    
    validarBuscaNome(nome,registros);

    return registros;

} 
catch (error) {
    throw error;
}

}


export async function listarHemocentrosService(){
try {
    
    const registros = await listarHemocentros();
    
    listarHemocentrosService(registros)


    return registros;
} 
catch (error) {
    throw error;
}


}