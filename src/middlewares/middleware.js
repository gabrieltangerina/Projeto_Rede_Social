const path = require('path');

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;

  next();
};

exports.loginRequire = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', "Você precisa logar para acessar essa aba");
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};

exports.comentarioNotNull = (req, res, next) => {
  if (req.body.comentario.trim() == '') {
    req.flash('errors', "Comentário inválido");
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
}

exports.grupoRequire = (req, res, next) => {
  if (req.session.user.grupo == "Nenhum") {
    req.flash('errors', "Você não pertence a um grupo");
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
}

const csrf = require('csurf');

exports.csrfProtection = csrf({ cookie: true });

exports.checkCsrfError = (err, req, res, next) => {
  if (err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('erro');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

