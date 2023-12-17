const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');

const comentarioSchema = new mongoose.Schema({
    texto: String,
    autor: String,
    criadoEm: {type: Date, default: Date.now}
});

const comentarioModel = mongoose.model('Comentario', comentarioSchema);

class Comentario{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.comentario = null;
    }

    async publicar(){
        this.valida();

        if(this.errors.length > 0) return;

        this.comentario = await comentarioModel.create(this.body);
        if(this.comentario.texto == ""){
            await comentarioModel.findByIdAndDelete(this.comentario._id);
        }
        return this.comentario;
    }

    valida(){
        this.verificaCampos();

        if (this.body.comentario) this.errors.push("Não há um comentário");

    }

    verificaCampos() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        };

        this.body = {
            texto: this.body.comentario,
            autor: this.body.autor
        };
    };


}

module.exports = {Comentario, comentarioModel, comentarioSchema};
