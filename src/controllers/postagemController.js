const { async } = require('regenerator-runtime');
const { Postagem } = require('../models/PostagemModel');
const { CadastroModel } = require('../models/CadastroModel');
const { comentarioModel } = require('../models/ComentarioModel');
const path = require('path');
const fs = require('fs').promises;

exports.paginaInicial = async function (req, res) {

    try {
        const user = req.session.user;

        const postagensGrupo = await Postagem.buscarPostagens({ grupo: `${user.grupo}` });

        res.render("postagem", { user, postagensGrupo });
    } catch (e) {
        console.log(e);
        res.render('erro');
    }
}

exports.publicar = async function (req, res) {

    try {

        const postagem = new Postagem(req.body);
        await postagem.publicar(req);


        await CadastroModel.findOne({ email: req.session.user.email });

        if (postagem.errors.length > 0) {
            req.flash('errors', postagem.errors);
            req.session.save(() => res.redirect('/postagem'));
            return;
        }

        req.flash('success', "Postagem publicada com sucesso");
        req.session.save(() => res.redirect(`/postagem`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('erro');
    }

};

exports.editIndex = async function (req, res) {
    try {
        if (!req.params.id) return res.render('erro');

        const user = req.session.user;

        const postagemEnviado = await Postagem.buscaPorId(req.params.id);
        const postagensGrupo = await Postagem.buscarPostagens({ grupo: `${user.grupo}` });

        if (!postagemEnviado) return res.render('erro');

        res.render("editarPostagem", { user, postagemEnviado, postagensGrupo });
    } catch (e) {
        console.log(e);
        res.render('erro');
    }
};

exports.edit = async function (req, res) {

    try {
        if (!req.params.id) return res.render('erro');

        const postagem = new Postagem(req.body);
        await postagem.edit(req.params.id);

        if (postagem.errors.length > 0) {
            req.flash('errors', postagem.errors);
            req.session.save(() => res.redirect(`/postagem/editar/${req.params.id}`));
            return;
        }

        req.flash('success', "Postagem editada com sucesso");
        req.session.save(() => res.redirect(`/postagem`));
        return;
    } catch (e) {
        console.log(e);
        res.render('erro');
    }

};

exports.delete = async function (req, res) {
    try {
        if (!req.params.id) return res.render('erro');
        const postDelete = await Postagem.buscarPostagens({ _id: req.params.id }); //RETORNA UM ARRAY

        if (postDelete && postDelete.length > 0) {
            const todosComentarios = await comentarioModel.find({});

            for (const postComentario of postDelete[0].comentarios) {
                for (const comentario of todosComentarios) {
                    if (postComentario._id.toString() == comentario._id.toString()) {
                        await comentarioModel.deleteOne({ _id: comentario._id });
                    }
                }
            }

            // Apaga as imagens da pasta uplaods
            for (const imagem of postDelete[0].imagem) {
                const imagePath = path.join(__dirname, '../../uploads/', imagem.url);
                await fs.unlink(imagePath);
            }

            await Postagem.delete(postDelete[0]._id);

            req.flash('success', "Postagem apagada com sucesso");
            req.session.save(() => res.redirect(`/postagem`));
        } else {
            req.flash('errors', "Postagem não encontrada");
            return;
        }

    } catch (e) {
        console.log(e);
        res.render('erro');
    }
};

exports.curtirPostagem = async function (req, res) {
    const postId = req.params.postagemId;
    const user = req.params.user;
    
    try {

        const todasPostagens = await Postagem.buscarPostagens({});
        const postagem = await Postagem.buscaPorId(postId);

        const jaCurtiu = postagem.curtidas.nomes.includes(user);

        if(jaCurtiu) return
        
        if (!postagem) {
            console.log("Postagem não encontrada");''
            res.render('erro');
        }
        
        // Adiciona o nome do usuário à lista de nomes de curtidas
        postagem.curtidas.nomes.push(user);
        
        // Incrementa a quantidade de curtidas
        postagem.curtidas.quantidade += 1;
        
        await postagem.save();
        res.redirect(`/`);

    } catch (e) {
        console.log(e);
        res.render('erro');
    }
}
