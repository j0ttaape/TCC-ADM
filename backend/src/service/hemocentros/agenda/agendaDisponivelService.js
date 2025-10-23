import { adicionarSemanaDisponivel, adicionarDiaDisponivel, listarAgenda } from "../../../repository/hemocentros/agenda/agendaDisponivelRepository.js";
import validarAdicionarSemana, { validarAdicionarDia, validarLista } from "../../../validation/hemocentro/agenda/agendaDisponivelValidation.js";

export async function adicionarSemanaService(requisitos){
try {
    validarAdicionarSemana(requisitos);

    const rows = await adicionarSemanaDisponivel(requisitos);
    return rows;
}
catch (error) {
    throw error
}

}

export async function adicionarDiaService(requisitos){
try {
    validarAdicionarDia(requisitos);

    const rows = await adicionarDiaDisponivel(requisitos);
    return rows;
}
catch (error) {
    throw error
}

}

export async function listarAgendaService(nome){
try {
validarLista(nome);
const registros = await listarAgenda(nome);

return registros;

} 
catch (error) {
    throw error
}

}
