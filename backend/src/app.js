import "dotenv/config"
import "./utils/global.js"

import express from "express";
import cors from "cors";
import { Rotas } from "./routes.js";


const api = express();
api.use(cors());
api.use(express.json());

Rotas(api);


const PORTA = process.env.PORTA;

api.listen(PORTA, () => console.log(`API subiu com sucesso na porta ${PORTA}`));