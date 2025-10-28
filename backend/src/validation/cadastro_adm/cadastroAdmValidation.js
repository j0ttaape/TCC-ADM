

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