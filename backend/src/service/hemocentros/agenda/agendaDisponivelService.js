import { adicionarSemanaDisponivel, adicionarDiaDisponivel } from "../../../repository/hemocentros/agenda/agendaDisponivelRepository.js";
import validarAdicionarSemana, { validarAdicionarDia } from "../../../validation/hemocentro/agenda/agendaDisponivelValidation.js";

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
