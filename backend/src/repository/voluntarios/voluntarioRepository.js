import connection from "../connection.js";
import transporter from "../email.js";

export async function listarVoluntarios() {
    const [rows] = await connection.execute('SELECT * FROM voluntarios where permissao = false');
    return rows;
}

export async function pesquisarVoluntario(voluntario) {
    const [rows] = await connection.execute(
        'SELECT * FROM voluntarios WHERE (nome LIKE ? OR email LIKE ? OR telefone LIKE ? OR cpf LIKE ?) and permissao = false',
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

export async function permitirVoluntario(id_adm,nome_voluntario){
    const comando = `select permissao, permissao_adm from cadastro_adm
    where id_adm = ?`;

    const [permissoes] = await connection.query(comando,[id_adm]);

    if(permissoes[0].permissao == true && permissoes[0].permissao_adm == true){
        // Buscar informações do voluntário antes de atualizar
        const [informacoes] = await connection.query(`select email from voluntarios where nome = ?`,[nome_voluntario]);

        if (!informacoes || informacoes.length === 0) {
            throw new Error('Voluntário não encontrado');
        }

        const comando2 = `
        update voluntarios
        set permissao = true
        where nome = ?
        `

        const [rows] = await connection.query(comando2,nome_voluntario);

        const assunto = `Parabéns, ${nome_voluntario}! Você foi aprovado(a) como voluntário(a)!`

        const texto = `Olá, ${nome_voluntario}!

        Temos uma ótima notícia: seu cadastro como voluntário(a) foi aprovado! 🎉

        Agradecemos por ter se disponibilizado a participar dessa causa tão importante. Sua ajuda fará diferença na vida de muitas pessoas.

        Em breve, nossa equipe entrará em contato com mais informações sobre as próximas atividades e formas de atuação.

        Seja bem-vindo(a) à equipe! 💖

        Com gratidão,
        Equipe Doe Vida`

await transporter.sendMail({
     to: informacoes[0].email,
    subject: assunto,
    text: texto
});

        return 'Voluntário confirmado com sucesso!';
    }
    else{
        return 'Você não tem permissão para esta ação ';
    }
}

export async function negarVoluntario(id_adm,nome_voluntario){
    const comando = `select permissao, permissao_adm from cadastro_adm
    where id_adm = ?`;

    const [permissoes] = await connection.query(comando,[id_adm]);

    if(permissoes[0].permissao == true && permissoes[0].permissao_adm == true){
        // Buscar informações do voluntário antes de deletar
        const [informacoes] = await connection.query(`select email from voluntarios where nome = ?`,[nome_voluntario]);

        if (!informacoes || informacoes.length === 0) {
            throw new Error('Voluntário não encontrado');
        }

        const comando2 = `
        DELETE FROM voluntarios
        WHERE nome = ?
        `

        const [rows] = await connection.query(comando2,nome_voluntario);

        const assunto = `🙁 Atualização sobre seu pedido de voluntariado`

        const texto = `Olá, ${nome_voluntario}!

Agradecemos sinceramente pelo seu interesse em fazer parte da nossa equipe de voluntariado. 💗

Após análise, infelizmente seu cadastro não foi aprovado neste momento.

Mas não desanime — valorizamos muito sua vontade de ajudar, e novas oportunidades poderão surgir em breve.

Continue acompanhando nossos canais e, quando quiser, sinta-se à vontade para tentar novamente!

Com carinho,
Equipe Doe Vida`

await transporter.sendMail({
     to: informacoes[0].email,
    subject: assunto,
    text: texto
});

        return 'usuario Negado e apagado do sistema!';
    }
    else{
        return 'Você não tem permissão para esta ação ';
    }
}
