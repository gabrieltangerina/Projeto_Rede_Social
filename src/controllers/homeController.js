const { async } = require("regenerator-runtime");
const { Postagem } = require('../models/PostagemModel');
const { comentarioModel } = require('../models/ComentarioModel');
const { grupoModel } = require('../models/GrupoModel');

exports.paginaInicial = async function (req, res) {
  try {
    const user = req.session.user;

    // Pegando os dados dos grupos
    const grupos = await grupoModel.find({})

    let todasPostagens;

    todasPostagens = await Postagem.buscarPostagens({});
    const comentarios = await comentarioModel.find({});

    if (user) {
      const jaCurtiu = todasPostagens.map(postagem => {
        return postagem.curtidas.nomes.some(nome => nome === `${user.nome} ${user.sobrenome}`);
      });
      res.render("index", { user, todasPostagens, comentarios, jaCurtiu, grupos });
    } else {
      res.render("index", { todasPostagens, comentarios, grupos });
    }

    return;
  } catch (e) {
    res.render('erro');
    console.log(e);
  }
}

exports.filtrarPostagem = async function (req, res) {
  const user = req.session.user;
  const url = req.params.url;

  let todasPostagens;

  function formataNome(nome) {
    let grupo = nome.charAt(0).toUpperCase() + nome.slice(1, 5);
    let letra = nome.slice(5, 6);
    const nomeGrupo = [];
    nomeGrupo.push(grupo);
    nomeGrupo.push(letra.toUpperCase());

    let nomeFormatado = nomeGrupo.join(' ');

    return nomeFormatado;
  }

  let nomeGrupoFormatado

  if (url == 'todos') {
    res.redirect(`/`);
    return;
  } else {
    nomeGrupoFormatado = formataNome(url);
    todasPostagens = await Postagem.buscarPostagens({ grupo: nomeGrupoFormatado });
  }

  const comentarios = await comentarioModel.find({});
  const grupos = await grupoModel.find({})

  if (user) {
    const jaCurtiu = todasPostagens.map(postagem => {
      return postagem.curtidas.nomes.some(nome => nome === `${user.nome} ${user.sobrenome}`);
    });
    res.render("index", { user, todasPostagens, comentarios, jaCurtiu, grupos });
  } else {
    res.render("index", { user, todasPostagens, comentarios, grupos });
  }

  return;
}
