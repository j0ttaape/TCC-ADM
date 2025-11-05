
export function validarPermissaoVoluntarios(id_adm,infos){
    if(!id_adm)
        throw new Error('Usuário não encontrado ou token inválido');
    if(!infos.id_voluntario)
    throw new Error('Voluntário não encontrado');
}

export function validarNegarVoluntarios(id_adm,infos){
    if(!id_adm)
        throw new Error('Usuário não encontrado ou token inválido');
    if(!infos.id_voluntario)
    throw new Error('Voluntário não encontrado');
}

export function validarListarVoluntariosHemocentro(nome_hemocentro){
    if(!nome_hemocentro)
        throw new Error('É necessário informar o nome do Hemocentro');
}