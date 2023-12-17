const { postagemModel } = require('../models/PostagemModel');
const { Comentario, comentarioModel } = require('../models/ComentarioModel');
const { Postagem } = require('../models/PostagemModel');

exports.adicionarComentario = async function(req, res){

    try{
        const comentario = new Comentario(req.body);
        const objComentario = await comentario.publicar();
    
        const postagem = await postagemModel.findById(req.params.id);
    
        if(!postagem) return res.render('erro');
    
        postagem.comentarios.push(objComentario);
    
        await postagem.save();

        res.redirect('/');
    }catch(e){
        console.log(e);
        res.render('erro');
    }
}

exports.deleteComentario = async function(req, res){
    try{
        const postagemId = req.params.postagemId;
        const comentarioId = req.params.comentarioId;

        const postagem = await Postagem.buscarPostagens({ _id: postagemId });

        if (!postagem || postagem.length === 0) {
            req.flash('errors', "Postagem não encontrada");
            return res.redirect('/postagem');
        }
    
        // Excluindo comentário do array comentarios da postagem
        await postagemModel.findByIdAndUpdate(
            postagemId,
            { $pull: { comentarios: { _id: comentarioId } } },
            { new: true }
        );
          
        // Excluindo comentários do Banco de Dados
        await comentarioModel.deleteOne({ _id: comentarioId });

        req.flash('success', "Comentário apagado com sucesso");
        req.session.save(() => res.redirect(`/postagem`));        
    } catch (e) {
        console.log(e);
        res.render('erro');
    }
};
