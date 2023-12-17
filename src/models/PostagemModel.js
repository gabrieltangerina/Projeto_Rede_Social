const mongoose = require('mongoose');
const { comentarioSchema } = require('../models/ComentarioModel');

const postagemSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, require: true },
    imagem: [
        { url: {type: String, require: true} }
    ],
    autor: { type: String, require: true },
    ultimaEdicao: { type: String },
    criadoEm: {type: Date, default: Date.now},
    comentarios: [comentarioSchema],
    curtidas: {
        quantidade: { type: Number, default: 0 },
        nomes: [{ type: String }],
    },
    grupo: {type: String}
});

const postagemModel = mongoose.model('postagem', postagemSchema);

class Postagem {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.postagem = null;
        this.postadoPor = null
    }

    static async buscaPorId(id){
        if(typeof id !== 'string') return;

        const postagem = await postagemModel.findById(id);
        
        return postagem;
    };

    static async buscarPostagens(criterio){
        if(criterio){ 
            const postagens = postagemModel.find(criterio).sort({ criadoEm: -1 });
            return postagens;
        }

        const postagens = postagemModel.find({}).sort({ criadoEm: -1 });
        return postagens

    }

    async edit(id){
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.postagem = await postagemModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async delete(id){

        const idStr = String(id);

        if (typeof idStr !== 'string') return;

        const postagem = await postagemModel.findOneAndDelete({ _id: idStr});
        return postagem;
    }

    async publicar(req){
        this.valida(req);

        if(this.errors.length > 0) return; 
        this.postagem = await postagemModel.create(this.body);
    }

    valida(req) {
        this.verificaCampos(req);

        if (this.body.titulo == "") this.errors.push("Título é um campo obrigatório")
        if (this.body.descricao == "") this.errors.push("Descrição é um campo obrigatório")

    };

    verificaCampos(req) {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        };

        this.body = {
            titulo: this.body.titulo,
            descricao: this.body.descricao,
            imagem: req.files.map(file => ({ url: file.filename })),
            autor: this.body.autor,
            grupo: this.body.grupo,
            ultimaEdicao: this.body.ultimaEdicao,
        };
    };


}

module.exports = { Postagem, postagemModel};
