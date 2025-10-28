

export default function validarCadastroAdm(info){
    
    if(!info.nome)
        throw new Error('É necessário nos informar seu nome');
    
    if(!info.senha)
        throw new Error('Informe a senha');
    
    if(info.senha.length < 8)
        throw new Error('A senha tem que ter no mínimo 8 caracteres');
    
    if(!info.email)
        throw new Error('É necessário nos informar seu email');
}

export function validarConcederPermissao(id_requerido){
if(!id_requerido)
throw new Error('É necessárioo informar o id de requerimento');

}

export function validarLoginAdm(requisitos){
    if(!requisitos.email)
        throw new Error('É necessário nos informar o email');
    if(!requisitos.senha)
        throw new Error('É necessário nos informar a senha');
}

export function validarlogarAdm(registros){
if(registros.length == 0 )
    throw new Error('Administrador não cadastrado');
if(registros[0].permissao == false)
    throw new Error('Você não tem permissão para logar');

}