const express = require('express');
const route = express.Router();
const csrf = require('csurf');''

const upload = require('./config/multer');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const cadastroController = require('./src/controllers/cadastroController');
const postagemController = require('./src/controllers/postagemController');
const comentarioController = require('./src/controllers/comentarioController');
const grupoController = require('./src/controllers/grupoController');

const { loginRequire, grupoRequire, comentarioNotNull, checkCsrfError, csrfMiddleware, csrfProtection } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', csrf(), checkCsrfError, csrfMiddleware, homeController.paginaInicial);
route.get('/filtro/:url', csrf(), checkCsrfError, csrfMiddleware, homeController.filtrarPostagem);

// Rotas de login
route.get('/login', csrf(), checkCsrfError, csrfMiddleware, loginController.paginaInicial);
route.post('/login/login', csrf(), checkCsrfError, csrfMiddleware, loginController.logar);
route.get('/login/logout', csrf(), checkCsrfError, csrfMiddleware, loginController.logout);

// Rotas de cadastro
route.get('/cadastro', csrf(), checkCsrfError, csrfMiddleware, cadastroController.paginaInicial);
route.post('/cadastro/cadastrar', csrf(), checkCsrfError, csrfMiddleware, cadastroController.cadastrar);

// Rotas de postagem
route.get('/postagem', csrf(), checkCsrfError, csrfMiddleware, loginRequire, grupoRequire, postagemController.paginaInicial);
route.post('/postagem/postar', loginRequire, grupoRequire, upload.array('files'), postagemController.publicar); // Sem o csrf(), checkCsrfError, csrfMiddleware,

// Rotas de edição de postagem
route.get('/postagem/editar/:id', csrf(), checkCsrfError, csrfMiddleware, loginRequire, grupoRequire, postagemController.editIndex);
route.post('/postagem/edit/:id', loginRequire, grupoRequire, upload.array('files'), postagemController.edit); // Sem o csrf(), checkCsrfError, csrfMiddleware,
route.get('/postagem/delete/:id', csrf(), checkCsrfError, csrfMiddleware, loginRequire, grupoRequire, postagemController.delete);

// Rota de comentários
route.post('/comentario/:id', csrf(), checkCsrfError, csrfMiddleware, loginRequire, comentarioNotNull, comentarioController.adicionarComentario);
route.get('/postagem/comentario/:postagemId/:comentarioId', csrf(), checkCsrfError, csrfMiddleware, loginRequire, comentarioController.deleteComentario);

// Rota curtidas
route.post('/curtida/:postagemId/:user', csrf(), checkCsrfError, csrfMiddleware, loginRequire, postagemController.curtirPostagem);

// Rota dos grupos
route.post('/grupo', csrf(), checkCsrfError, csrfMiddleware, loginRequire, grupoController.descricaoGrupo);
route.post('/participantes', csrf(), checkCsrfError, csrfMiddleware, loginRequire, grupoController.participantes);

module.exports = route;
