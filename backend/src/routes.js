
import cad from "./controller/cadastro_adm/cadastroAdmController.js";
import hemo from "./controller/hemocentros/hemocentrosController.js";
import cadHemo from "./controller/cadastrar_hemo/cadastrarHemoController.js";

export function Rotas(api){
    api.use(hemo);
    api.use(cad);
    api.use(cadHemo);
}
