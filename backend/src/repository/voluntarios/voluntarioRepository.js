import connection from "../connection.js";
import transporter from "../email.js";

export async function listarVoluntarios() {
    const [rows] = await connection.query(`
        SELECT v.*, h.nome_hemocentro
        FROM voluntarios v
        inner join hemocentros h ON v.id_hemocentro = h.id_hemocentro
        WHERE v.permissao = false
        order by v.nome
    `);
    return rows;
}

export async function pesquisarVoluntario(voluntario) {
    const [rows] = await connection.query(
        `SELECT v.*, h.nome_hemocentro
         FROM voluntarios v
         inner JOIN hemocentros h ON v.id_hemocentro = h.id_hemocentro
         WHERE (v.nome LIKE ? OR v.email LIKE ? OR v.telefone LIKE ? OR v.cpf LIKE ?) AND v.permissao = false`,
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

export async function deletarVoluntario(id_adm,id_voluntario) {
    const comando2 = `
    select permissao,permissao_adm from cadastro_adm
    where id_adm = ?
    `;

    const [permissoes] = await connection.query(comando2,[id_adm]);

    if(permissoes[0].permissao == true && permissoes[0].permissao_adm == true ){
    
    const comando = `
    DELETE FROM voluntarios
    WHERE id = ?
    `

    await connection.query(comando, [id_voluntario]);
    return "Voluntário deletado com sucesso";}

    else {
        return 'você não tem permissão para esta ação';
    }
}

export async function permitirVoluntario(id_adm,infos){
    const comando = `select permissao, permissao_adm from cadastro_adm
    where id_adm = ?`;

    const [permissoes] = await connection.query(comando,[id_adm]);

    if(permissoes[0].permissao == true && permissoes[0].permissao_adm == true){
        // Buscar informações do voluntário antes de atualizar
        const [informacoes] = await connection.query(`select nome,email from voluntarios where id = ?`,[infos.id_voluntario]);

        if (!informacoes || informacoes.length === 0) {
            throw new Error('Voluntário não encontrado');
        }

        const comando2 = `
        update voluntarios
        set permissao = true
        where id = ?
        `

        const [rows] = await connection.query(comando2,[infos.id_voluntario]);

        const assunto = `Parabéns, ${informacoes[0].nome}! Você foi aprovado(a) como voluntário(a)!`

        const texto = `Olá, ${informacoes[0].nome}!

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

export async function negarVoluntario(id_adm,infos){
    const comando = `select permissao, permissao_adm from cadastro_adm
    where id_adm = ?`;

    const [permissoes] = await connection.query(comando,[id_adm]);

    if(permissoes[0].permissao == true && permissoes[0].permissao_adm == true){
        // Buscar informações do voluntário antes de deletar
        const [informacoes] = await connection.query(`select nome,email from voluntarios where id = ?`,[infos.id_voluntario]);

        if (!informacoes || informacoes.length === 0) {
            throw new Error('Voluntário não encontrado');
        }

        const comando2 = `
        DELETE FROM voluntarios
        WHERE id = ?
        `

        const [rows] = await connection.query(comando2,infos.id_voluntario);

        const assunto = `🙁 Atualização sobre seu pedido de voluntariado`

        const texto = `Olá, ${informacoes[0].nome}!

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


export async function listarVoluntáriosHemocentro(nome_hemo){
     const comando = `
        select id_hemocentro from hemocentros
        where nome_hemocentro = ?
        `
        const [id] = await connection.query(comando,[nome_hemo]);

        if(id.length == 1){
        const comando2 = `
            select v.id as id_voluntario, v.nome as nome_voluntario, v.email as email_voluntario, v.telefone as telefone_voluntario, cu.tipo_sanguineo as tipo_sanguineo_voluntario
            from voluntarios v
            inner join cadastro_users cu on v.usuario_id = cu.id_cadastro
            where v.id_hemocentro = ?
            and v.permissao = true
        `;
        const [registros] = await connection.query(comando2,[id[0].id_hemocentro]);

        return registros;
}

else{
    return 'hemocentro não encontrado';
}
}
