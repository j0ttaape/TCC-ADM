
import cad from "./controller/cadastro_adm/cadastroAdmController.js";
import hemo from "./controller/hemocentros/hemocentrosController.js";
import cadHemo from "./controller/cadastrar_hemo/cadastrarHemoController.js";
import editar from "./controller/editar/editarController.js";
import deletar from "./controller/deletar/deletarController.js";
import age from "./controller/hemocentros/agenda/agendaDisponiveController.js";
import estoque from "./controller/estoque/estoqueController.js";
import gerenciarUser from "./controller/gerenciarDoadores/gerenciarUserController.js";
import relatorioGeral from "./controller/relatorioGeral/relatorioGeralController.js";

export function Rotas(api){
    api.use(hemo);
    api.use(cad);
    api.use(cadHemo);
    api.use(editar);
    api.use(deletar);
    api.use(age);
    api.use(estoque);
    api.use(gerenciarUser);
    api.use(relatorioGeral);


}
