

export default function validarAdicionarSemana(requisitos){
if(!requisitos.nome_hemo)
    throw new Error('É necessário escolher hemocentro');
if(!requisitos.data_inicial)
    throw new Error('Informe a data inicial');
if(!requisitos.data_final)
    throw new Error('Informe a data final');
if(!requisitos.horarios || !Array.isArray(requisitos.horarios) || requisitos.horarios.length === 0)
    throw new Error('Informe os horários');

// Validar formato das datas
if(!/^\d{2}\/\d{2}\/\d{4}$/.test(requisitos.data_inicial))
    throw new Error('Formato da data inicial inválido. Use DD/MM/YYYY');
if(!/^\d{2}\/\d{2}\/\d{4}$/.test(requisitos.data_final))
    throw new Error('Formato da data final inválido. Use DD/MM/YYYY');

// Verificar se data final é maior ou igual à data inicial
const dataInicio = new Date(requisitos.data_inicial.split('/').reverse().join('-'));
const dataFim = new Date(requisitos.data_final.split('/').reverse().join('-'));
if (dataFim < dataInicio) {
    throw new Error('Data final deve ser maior ou igual à data inicial');
}

// Verificar se a data inicial é anterior a hoje
const hoje = new Date();
hoje.setHours(0, 0, 0, 0); // Definir para o início do dia
if (dataInicio < hoje) {
    throw new Error('Data inicial não pode ser anterior a hoje');
}

// Verificar se o período não excede 30 dias
const diffTime = Math.abs(dataFim - dataInicio);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
if (diffDays > 30) {
    throw new Error('O período máximo permitido é de 30 dias');
}

}

export function validarAdicionarDia(requisitos){
if(!requisitos.nome_hemo)
    throw new Error('É necessário escolher hemocentro');
if(!requisitos.data)
    throw new Error('Informe a data');
if(!requisitos.horario_inicio)
    throw new Error('Informe o horário de início');
if(!requisitos.horario_fim)
    throw new Error('Informe o horário de fim');

// Validar formato da data
if(!/^\d{2}\/\d{2}\/\d{4}$/.test(requisitos.data))
    throw new Error('Formato da data inválido. Use DD/MM/YYYY');

// Verificar se a data é anterior a hoje
const data = new Date(requisitos.data.split('/').reverse().join('-'));
const hoje = new Date();
hoje.setHours(0, 0, 0, 0); // Definir para o início do dia
if (data < hoje) {
    throw new Error('Data não pode ser anterior a hoje');
}

}

export function validarLista(nome){
if(!nome)
    throw new Error('Énecessário o nome do hemocentro');
}

export function validarMes(mes){
if(!mes)
    throw new Error('É necessário informar o mês');
if(!/^\d{2}\/\d{4}$/.test(mes))
    throw new Error('Formato do mês inválido. Use MM/YYYY');
}

export function validarData(data){
if(!data)
    throw new Error('É necessário informar a data');
if(!/^\d{2}\/\d{2}\/\d{4}$/.test(data))
    throw new Error('Formato da data inválido. Use DD/MM/YYYY');

// Verificar se a data é anterior a hoje
const dataObj = new Date(data.split('/').reverse().join('-'));
const hoje = new Date();
hoje.setHours(0, 0, 0, 0); // Definir para o início do dia
if (dataObj < hoje) {
    throw new Error('Data não pode ser anterior a hoje');
}
}

export function validarHorario(horario){
if(!horario)
    throw new Error('É necessário informar o horário');
if(!/^\d{2}:\d{2}$/.test(horario))
    throw new Error('Formato do horário inválido. Use HH:mm');
}

