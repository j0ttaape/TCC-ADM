

export default function validarAdicionarSemana(requisitos){
if(!requisitos.nome)
    throw new Error('É necessário escolher hemocentro');
if(!requisitos.hComeco)
    throw new Error('Informe o horário de início');
if(!requisitos.hFim)
    throw new Error('Informe o horário final');
if(!requisitos.diaInicio)
    throw new Error('Informe a data de início');

}

export function validarAdicionarDia(requisitos){
if(!requisitos.nome)
    throw new Error('É necessário escolher hemocentro');
if(!requisitos.hComeco)
    throw new Error('Informe o horário de início');
if(!requisitos.hFim)
    throw new Error('Informe o horário final');
if(!requisitos.dia)
    throw new Error('Informe a data do dia');

}
