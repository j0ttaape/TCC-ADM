import connection from "../connection.js";
import transporter from "../email.js";

export async function permissaoAdm(informacoes){
const comando = `
insert into cadastro_adm(nome,email, senha, permissao)
values
(?,?,MD5(?),false)
`
const [info] = await connection.query(comando,[informacoes.nome,informacoes.email,informacoes.senha]);

const comando2 = `
select * from cadastro_adm
`

const [registros] = await connection.query(comando2);

if(registros.length == 1){
    const comando3 = `
    update cadastro_adm
    set permissao = true
    where id_adm = ?
    `

     await connection.query(comando3,[info.insertId]);
     let mensagem = 'Administrador permitido'
    return mensagem
}
else{
    let mensagem = 'Aguardar permissão'

    const assunto = `Recebemos seu pedido para acesso administrativo ⚙️`;
    const texto = `Olá, ${informacoes.nome}!

Recebemos sua solicitação para ingressar na equipe de administração do site.
Nosso time irá analisar seu pedido com atenção e em breve você receberá um retorno informando se o acesso foi aprovado ou negado.

Agradecemos pelo interesse em contribuir com o projeto e fazer parte da nossa equipe! 🙌

Atenciosamente,
Equipe Doe Vida`

await transporter.sendMail({
     to: informacoes.email,
    subject: assunto,
    text: texto
});

return mensagem
}

}



export async function listarPedidos(){
    const comando = `
    select * from cadastro_adm
    where permissao = false
    `

    const [registros] = await connection.query(comando);

    return registros;
}

export async function concederPermissao(id_requerido,id_adm){
    const comando = `
    select permissao from cadastro_adm
    where id_adm = ?
    `
    const [adm] = await connection.query(comando,[id_adm]);

    if (adm.length === 0) {
        return 'Administrador não encontrado';
    }

    const perm = adm[0].permissao;




    if(perm){
        const comando_check = `select id_adm from cadastro_adm where id_adm = ?`;
        const [check] = await connection.query(comando_check, [id_requerido]);
        if (check.length === 0) {
            return 'Usuário não encontrado';
        }

        const comando2 = `
        update cadastro_adm
        set permissao = true
        where id_adm = ?
        `
        await connection.query(comando2,[id_requerido]);
            const comando4 = `select nome from cadastro_adm
    where id_adm = ?`

    const [nome] = await connection.query(comando4,[id_requerido]);

    const assunto = `Seu acesso administrativo foi aprovado 🎉`;
    const texto = `Olá, ${nome[0].nome}!

Temos o prazer de informar que seu pedido para ingressar na administração do site foi aprovado.

Agora você possui acesso às ferramentas e recursos administrativos.
Por favor, utilize suas credenciais para entrar no painel e começar a colaborar com a equipe.

Seja bem-vindo(a) à administração! 👏

Atenciosamente,
Equipe Doe Vida`
const comando3 = `select email from cadastro_adm
where id_adm = ?`;

const [email] = await connection.query(comando3,[id_requerido])

await transporter.sendMail({
     to: email[0].email,
    subject: assunto,
    text: texto
});

        let resposta = 'Usuário Permitido'
        return resposta
    }
    else {
        let resposta = 'Você não tem permissão para essa ação'
        return resposta;
    }


}

export async function negarPermissao(id_requerido,id_adm){
    const comando = `
    select permissao from cadastro_adm
    where id_adm = ?
    `
    const [adm] = await connection.query(comando,[id_adm]);

    if (adm.length === 0) {
        return 'Administrador não encontrado';
    }

    const perm = adm[0].permissao;


    if(perm){
        const comando_check = `select id_adm from cadastro_adm where id_adm = ?`;
        const [check] = await connection.query(comando_check, [id_requerido]);
        if (check.length === 0) {
            return 'Usuário não encontrado';
        }

        const comando4 = `select nome from cadastro_adm
    where id_adm = ?`

    const [nome] = await connection.query(comando4,[id_requerido]);

    const assunto = `Seu pedido de acesso administrativo foi negado ❗`;
    const texto = `Olá, ${nome[0].nome}!

Após análise, seu pedido para fazer parte da administração do site foi negado.
Isso pode ter ocorrido por não atender aos critérios necessários no momento, ou por decisão da equipe responsável.

Agradecemos seu interesse e apoio! Você continua sendo bem-vindo(a) como usuário e poderá enviar uma nova solicitação futuramente, se desejar.

Atenciosamente,
Equipe Doe Vida`

const comando3 = `select email from cadastro_adm
where id_adm = ?`;

const [email] = await connection.query(comando3,[id_requerido])

await transporter.sendMail({
     to: email[0].email,
    subject: assunto,
    text: texto
});

        const comando2 = `
        delete from cadastro_adm
        where id_adm = ?
        `
        await connection.query(comando2,[id_requerido]);

        let resposta = 'Permissão Negada e registro removido'
        return resposta
    }
    else {
        let resposta = 'Você não tem permissão para essa ação'
        return resposta;
    }


}

export async function loginAdm(requisitos){
    const comando = `
    select * from cadastro_adm 
    where email = ?
    and senha = MD5(?)
    `
    const [registros] = await connection.query(comando,[requisitos.email,requisitos.senha]);

    
    return registros;
}
