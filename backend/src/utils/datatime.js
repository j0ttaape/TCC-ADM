export function horaAtual(){
    let agora = new Date();
    let msg = agora.toLocaleDateString() + " " + agora.toLocaleTimeString();
return msg;
}

export function converterDataBrasileiraParaISO(dataBrasileira) {
    // Espera formato DD/MM/YYYY
    const partes = dataBrasileira.split('/');
    if (partes.length !== 3) {
        throw new Error('Formato de data inválido. Use DD/MM/YYYY');
    }
    const dia = partes[0].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[2];
    return `${ano}-${mes}-${dia}`;
}
