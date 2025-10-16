



import cad from "./controller/cadastro_adm/cadastroAdmController.js";
import hemo from "./controller/hemocentros/hemocentrosController.js";

export function Rotas(api){
    api.use(hemo);
    api.use(cad);
}
