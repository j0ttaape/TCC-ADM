

export default function validarBuscaNome(nome,registros){
if(!nome)
throw new Error('é necessário inserir um nome');
if(registros.length === 0)
throw new Error('Hemocentro inexistente');


}
