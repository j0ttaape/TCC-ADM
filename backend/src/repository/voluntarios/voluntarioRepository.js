import connection from "../connection.js";

export async function listarVoluntarios() {
    const [rows] = await connection.execute('SELECT * FROM voluntarios');
    return rows;
}

export async function pesquisarVoluntario(voluntario) {
    const [rows] = await connection.execute(
        'SELECT * FROM voluntarios WHERE nome LIKE ? OR email LIKE ? OR telefone LIKE ? OR cpf LIKE ?',
        [`%${voluntario}%`, `%${voluntario}%`, `%${voluntario}%`, `%${voluntario}%`]
    );
    return rows;
}

export async function editarVoluntario(informacoes, id_voluntario) {
    const comando = `
    UPDATE voluntarios
    SET nome = ?, email = ?, telefone = ?, cpf = ?, disponibilidade = ?, mensagem = ?
    WHERE id = ?
    `

    await connection.query(comando, [informacoes.nome, informacoes.email, informacoes.telefone, informacoes.cpf, informacoes.disponibilidade, informacoes.mensagem, id_voluntario]);
    return "Voluntário editado com sucesso";
}

export async function deletarVoluntario(id_voluntario) {
    const comando = `
    DELETE FROM voluntarios
    WHERE id = ?
    `

    await connection.query(comando, [id_voluntario]);
    return "Voluntário deletado com sucesso";
}
