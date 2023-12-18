import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import './modules/temporizadorMessages';
import toggleDescricao from './modules/ocultarDescricao';
import toggleComentario from './modules/ocultarComentario';
import curtirPostagem from './modules/curtirPostagem';
import filtrarGrupos from './modules/filtrarGrupos';
import adicionarParticipante from './modules/adicionarParticipantes';

import ValidaCadastro from './modules/validaCadastro';
import ValidaLogin from './modules/validaLogin';
const bootstrap = require('bootstrap')

const login = new ValidaLogin('.form-login');
const cadastro = new ValidaCadastro('.form-cadastro');

login.inicializa();
cadastro.inicializa();

document.addEventListener('DOMContentLoaded', toggleDescricao());
document.addEventListener('DOMContentLoaded', toggleComentario());
document.addEventListener('DOMContentLoaded', curtirPostagem());
try{
    document.addEventListener('DOMContentLoaded', filtrarGrupos());
}catch(e){
    console.log("Não está na home por isso nao renderiza");
}
document.addEventListener('DOMContentLoaded', adicionarParticipante());

