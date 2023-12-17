const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const CadastroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  grupo: { type: String }
});

const CadastroModel = mongoose.model('Conta', CadastroSchema);

class Cadastro {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async registra() {
    this.valida();

    if (this.errors.length > 0) return false;

    const user = await CadastroModel.findOne({ email: this.body.email });

    if (user) {
      return false;
    }

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await CadastroModel.create(this.body);
    return true;
  }


  async usuarioExiste() {
    const user = await CadastroModel.findOne({ email: this.body.email });
  }

  valida() {
    this.verificaCampos();

    // NÃO HÁ MAIS VALIDAÇÕES AQUI PORQUE ESTÁ TUDO SENDO VALIDADO NO LADO DO CLIENTE
  }

  verificaCampos() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    };

    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      password: this.body.password,
      grupo: this.body.grupo,
      senhaGrupo: this.body.senhaGrupo
    };
  }
}

module.exports = { Cadastro, CadastroModel };
