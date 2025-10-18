

export default function validarBuscaNome(nome, registros) {
    if (!nome || nome.trim() === '') {
        throw new Error('É necessário inserir um nome');
    }
    // Removido a validação de registros vazios para permitir busca flexível
}

export function validarListarHemocentros(registros) {
    if (!registros || registros.length === 0) {
        throw new Error('Ainda não temos nenhum hemocentro cadastrado');
    }
}
