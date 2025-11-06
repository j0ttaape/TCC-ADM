import connection from "../connection.js";
import transporter from "../email.js";

export async function adicionarNoEstoque(infos, id_adm) {
    const comando2 = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando2, [infos.nome_hemo]);

    if (id.length == 1) {
        // Verificar se a adição não excede a quantidade máxima
        const comandoVerificar = `
        select quantidade_bolsas, quantidade_maxima from estoque
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        const [estoqueAtual] = await connection.query(comandoVerificar, [id[0].id_hemocentro, infos.tipo_sanguineo]);

        if (estoqueAtual.length > 0) {
            const novaQuantidade = estoqueAtual[0].quantidade_bolsas + infos.quantidade;
            const novaMaxima = estoqueAtual[0].quantidade_maxima + infos.quantidade_maxima;

            if (novaQuantidade > novaMaxima) {
                throw new Error('A quantidade de bolsas não pode exceder a quantidade máxima');
            }
        }

        const comando3 = `
        update estoque
        set quantidade_bolsas = quantidade_bolsas + ?,
        quantidade_maxima = quantidade_maxima + ?
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        await connection.query(comando3, [infos.quantidade, infos.quantidade_maxima, id[0].id_hemocentro, infos.tipo_sanguineo]);
        return 'salvo no banco de dados'

    }

    else {
        return 'Hemocentro não encontrado'
    }

}


export async function retirarDoEstoque(infos, id_adm) {
    const comando2 = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando2, [infos.nome_hemo]);

    if (id.length == 1) {
        // Verificar se há quantidade suficiente para retirada
        const comandoVerificar = `
        select quantidade_bolsas, quantidade_maxima from estoque
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        const [estoqueAtual] = await connection.query(comandoVerificar, [id[0].id_hemocentro, infos.tipo_sanguineo]);

        if (estoqueAtual.length > 0) {
            const novaQuantidade = estoqueAtual[0].quantidade_bolsas - infos.quantidade;
            const novaMaxima = estoqueAtual[0].quantidade_maxima - infos.quantidade_maxima;

            if (novaQuantidade < 0 || novaMaxima < 0) {
                return 'A quantidade a retirar não pode deixar o estoque negativo';
            }
        } else {
            return 'Estoque não encontrado para este tipo sanguíneo';
        }

        const comando3 = `
        update estoque
        set quantidade_bolsas = quantidade_bolsas - ?,
        quantidade_maxima = quantidade_maxima - ?
        where id_hemocentro = ?
        and tipo_sanguineo = ?
        `
        await connection.query(comando3, [infos.quantidade, infos.quantidade_maxima, id[0].id_hemocentro, infos.tipo_sanguineo]);
        return 'retirado do banco de dados'

    }

    else {
        return 'Hemocentro não encontrado'
    }

}

export async function listarEstoqueHemocentro(nome_hemo) {
    const comando = `
    select id_hemocentro from hemocentros
    where nome_hemocentro = ?
    `
    const [id] = await connection.query(comando, [nome_hemo]);

    if (id.length == 1) {
        const comando2 = `
        select tipo_sanguineo, quantidade_bolsas, quantidade_maxima
        from estoque
        where id_hemocentro = ?
        order by tipo_sanguineo
        `
        const [estoque] = await connection.query(comando2, [id[0].id_hemocentro]);
        return estoque;
    }
    else {
        throw new Error('Hemocentro não encontrado');
    }
}


export async function mandarEmailNecessitado() {
    try {
        const comandoEstoque = `select * from estoque`;
        const [estoque] = await connection.query(comandoEstoque);

        for (let item of estoque) {
            const porcentagem = item.quantidade_bolsas / item.quantidade_maxima;

            if (porcentagem <= 0.35) {
                const comandoDoadores = `
                    select * from cadastro_users
                    where tipo_sanguineo = ?
                `;
                const [doadores] = await connection.query(comandoDoadores, [item.tipo_sanguineo]);

                const comandoHemocentro = `
                    select h.* from estoque e
                    inner join hemocentros h on h.id_hemocentro = e.id_hemocentro
                    where e.id_hemocentro = ?
                `;
                const [hemocentro] = await connection.query(comandoHemocentro, [item.id_hemocentro]);

                if (!hemocentro[0]) continue;

                for (let doador of doadores) {

                    if (
                        hemocentro[0].cidade_hemocentro &&
                        doador.cidade &&
                        hemocentro[0].cidade_hemocentro.toLowerCase() === doador.cidade.toLowerCase()
                    ) {
                        const comandoEmailJa = `
                            select * from email_estoque
                            where id_doador = ?
                        `;
                        const [emailJa] = await connection.query(comandoEmailJa, [doador.id_cadastro]);

                        if (emailJa.length === 0) {
                            const comandoInsertEmail = `
                                insert into email_estoque (id_doador, dia)
                                values (?, curdate())
                            `;
                            await connection.query(comandoInsertEmail, [doador.id_cadastro]);

                            const assunto = `${doador.nome_completo}, sua doação pode salvar vidas hoje!`;
                            const texto = `Olá, ${doador.nome_completo}! ❤️

  Esperamos que você esteja bem.
  Estamos entrando em contato porque o estoque de sangue do tipo ${item.tipo_sanguineo} está baixo em nosso hemocentro ${hemocentro[0].nome_hemocentro}.

  Como você já é um doador e possui esse tipo sanguíneo, sua doação é extremamente importante neste momento.
  Cada doação pode salvar até quatro vidas, e sua ajuda fará toda a diferença para pacientes que estão precisando urgentemente de transfusões.

  📍 Local de doação:
  ${hemocentro[0].nome_hemocentro}
  ${hemocentro[0].rua_hemocentro}, ${hemocentro[0].bairro_hemocentro}, ${hemocentro[0].cidade_hemocentro}

  🕓 Horário de atendimento:
  Segunda a sexta, das 8h às 17h
  Sábado, das 8h às 12h

  💡 Lembre-se: doar sangue é um ato rápido, seguro e solidário.
  Venha quando puder — estaremos prontos para recebê-lo com todo o cuidado e gratidão.

  Agradecemos de coração por sua generosidade e por continuar salvando vidas!

  Com carinho,
  Equipe do Doe Vida`;

                            try {
                                await transporter.sendMail({
                                    to: doador.email,
                                    subject: assunto,
                                    text: texto
                                });
                            } catch (emailError) {
                                console.error(`Erro ao enviar email para ${doador.email}:`, emailError);
                                // Continue para o próximo doador
                            }
                        }

                        if (emailJa.length === 1) {
                            const dataDoacao = new Date(emailJa[0].dia);
                            const hoje = new Date();
                            const diffDias = (hoje - dataDoacao) / (1000 * 60 * 60 * 24);

                            if (diffDias >= 75) {
                                const comandoUpdateEmail = `
                                    update email_estoque
                                    set dia = curdate()
                                    where id_doador = ?
                                `;
                                await connection.query(comandoUpdateEmail, [doador.id_cadastro]);

                                const assunto = `${doador.nome_completo}, precisamos da sua ajuda novamente! 🩸`;
                                const texto = `Olá, ${doador.nome_completo}! ❤️

  Esperamos que você esteja bem.

  Queremos agradecer pela sua doação anterior — graças à sua solidariedade, muitas vidas foram salvas. 💪
  Hoje, estamos entrando em contato porque o estoque de sangue do tipo ${item.tipo_sanguineo} está baixo em nosso hemocentro ${hemocentro[0].nome_hemocentro}, e sua nova doação pode fazer toda a diferença mais uma vez.

  Sua contribuição é essencial para manter os estoques seguros e garantir o atendimento de pacientes que precisam de transfusões urgentes.

  📍 Local de doação:
  ${hemocentro[0].nome_hemocentro}
  ${hemocentro[0].rua_hemocentro}, ${hemocentro[0].bairro_hemocentro}, ${hemocentro[0].cidade_hemocentro}

  🕓 Horário de atendimento:
  Segunda a sexta, das 8h às 17h
  Sábado, das 8h às 12h

  💡 Lembre-se: doar sangue é um gesto rápido, seguro e que salva vidas.
  Se já se passaram mais de 75 dias desde sua última doação, você já pode doar novamente!

  Agradecemos de coração por continuar sendo parte dessa corrente do bem.
  Esperamos te ver em breve! ❤️

  Com gratidão,
  Equipe Doe Vida`;

                                try {
                                    await transporter.sendMail({
                                        to: doador.email,
                                        subject: assunto,
                                        text: texto
                                    });
                                } catch (emailError) {
                                    console.error(`Erro ao enviar email para ${doador.email}:`, emailError);
                                    // Continue para o próximo doador
                                }
                            }
                        }
                    }
                
            }
          }
     }

        return 'ok';
    } catch (error) {
        console.error('Erro na função mandarEmailNecessitado:', error);
        throw error; // Re-throw para que o erro seja propagado
    }
}
  