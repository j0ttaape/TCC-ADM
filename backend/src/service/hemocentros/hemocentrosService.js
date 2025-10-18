import { buscarHemocentros, listarHemocentros } from "../../repository/hemocentros/hemocentrosRepository.js";
import validarBuscaNome, { validarListarHemocentros } from "../../validation/hemocentro/hemocentrosValidation.js";


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

    validarListarHemocentros(registros);

    return registros;
}
catch (error) {
    throw error;
}


}
