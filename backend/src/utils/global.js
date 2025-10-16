import {horaAtual} from "./datatime.js";

global.criarErro = function criarError(err){
    let obj = {
        erro: err.message
    }

    return obj
}

global.logErro = function logError(err){
    console.log(horaAtual() + "ERROR --->" + err.message );  
}

