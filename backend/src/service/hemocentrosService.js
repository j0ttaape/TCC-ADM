import { buscarHemocentros } from "../repository/hemocentrosRepository.js";
import validarBuscaNome from "../validation/hemocentrosValidation.js";


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