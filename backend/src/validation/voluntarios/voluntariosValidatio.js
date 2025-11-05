
export function validarPermissaoVoluntarios(id_adm,nome_voluntario){
    if(!id_adm)
        throw new Error('Usuário não encontrado ou token inválido');
    if(!nome_voluntario)
    throw new Error('Voluntário não encontrado');
}

export function validarNegarVoluntarios(id_adm,nome_voluntario){
    if(!id_adm)
        throw new Error('Usuário não encontrado ou token inválido');
    if(!nome_voluntario)
    throw new Error('Voluntário não encontrado');
}
