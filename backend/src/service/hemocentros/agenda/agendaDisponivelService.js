import { adicionarSemanaDisponivel, adicionarDiaDisponivel, listarAgenda, listarMeses, listarDatasPorMes, listarHorariosPorData, deletarDiaAgenda, deletarHorarioAgenda } from "../../../repository/hemocentros/agenda/agendaDisponivelRepository.js";
import validarAdicionarSemana, { validarAdicionarDia, validarLista, validarMes, validarData, validarHorario } from "../../../validation/hemocentro/agenda/agendaDisponivelValidation.js";

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

export async function listarMesesService(nome){
try {
validarLista(nome);
const registros = await listarMeses(nome);

return registros;

}
catch (error) {
    throw error
}

}

export async function listarDatasPorMesService(nome, mes){
try {
validarLista(nome);
validarMes(mes);
const registros = await listarDatasPorMes(nome, mes);

return registros;

}
catch (error) {
    throw error
}

}

export async function listarHorariosPorDataService(nome, data){
try {
validarLista(nome);
validarData(data);
const registros = await listarHorariosPorData(nome, data);

return registros;

}
catch (error) {
    throw error
}

}

export async function deletarDiaAgendaService(nome,data) {
    try {
        validarLista(nome);
        validarData(data);

    const linhas = await deletarDiaAgenda(data,nome);

    return linhas;

    }
    catch (error) {
        throw error
    }


}

export async function deletarHorarioAgendaService(nome, data, horario) {
    try {
        validarLista(nome);
        validarData(data);
        validarHorario(horario);

    const linhas = await deletarHorarioAgenda(data, horario, nome);

    return linhas;

    }
    catch (error) {
        throw error
    }


}
