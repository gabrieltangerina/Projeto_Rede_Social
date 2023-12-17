const mongoose = require('mongoose');
const { CadastroModel } = require('./CadastroModel'); // Importe o CadastroModel
const validator = require('validator');
const bcryptjs = require('bcryptjs')

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async logar(){  
        this.valida();

        if(this.errors.length > 0) return; 

        this.user = await CadastroModel.findOne({ email: this.body.email });

        if(!this.user){
            this.errors.push('Email não cadastrado');
            return;
        } 
            
    
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("Senha inválida");
            this.user = null;
            return;
        };


    }

    valida(){
        this.verificaCampos();
    
        if(!validator.isEmail(this.body.email)) this.errors.push("Email Inválido");

    }
    

    verificaCampos(){
        for(let key in this.body){
          if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
          }
        };
    
        this.body = {
          email: this.body.email,
          password: this.body.password
        };
      }
    
}

module.exports = Login;
