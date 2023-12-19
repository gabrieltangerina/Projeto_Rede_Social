const Login = require("../models/LoginModel");

exports.paginaInicial = (req, res) => {
  if (req.session.user) return res.render('logado');
  return res.render('login', { isLoginPage: true });
};

exports.logar = async function (req, res) {

  try {
    const login = new Login(req.body);
    await login.logar();

    req.session.formData = req.body;

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login'));
      return;
    }

    req.flash('success', "Bem vindo");
    delete req.session.formData;''
    req.session.user = login.user;
    req.session.save(() => res.redirect('/'));
    return;

  } catch (e) {
    console.log(e);
    res.render('erro');
  }
}

exports.logout = function (req, res) {
  if (req.session.user) {
    req.session.destroy();
  } else {
    res.redirect('/');
  }

  // APENAS PARA A PÁGINA NÃO FICAR APENAS CARREGANDO INFINITAMENTE
  setTimeout(() => {
    res.redirect('/');
  }, 3000);
}