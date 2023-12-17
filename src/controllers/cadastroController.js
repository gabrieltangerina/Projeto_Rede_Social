const { Cadastro } = require("../models/CadastroModel");

exports.paginaInicial = function (req, res) {
    if (req.session.user) return res.render('logado');
    res.render('cadastro', { mensagem: "" });
};

exports.cadastrar = async function (req, res) {

    try {
        const cadastro = new Cadastro(req.body);
        const registroBemSucedido = await cadastro.registra();

        req.session.formData = req.body;

        if (!registroBemSucedido) {
            res.render("cadastro", { mensagem: "Email em uso" });
            return;
        }

        req.flash('success', "Usuário cadastrado com sucesso");
        req.session.save(() => res.redirect('/'));
        return;
    } catch (e) {
        console.log(e);
        res.render('erro');
    }
}