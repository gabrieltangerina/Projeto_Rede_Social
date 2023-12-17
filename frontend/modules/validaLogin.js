import validator from "validator";

export default class Valida{
    constructor(formulario){
        this.formulario = document.querySelector(formulario);
    }

    inicializa(){
        this.eventos();
    }

    eventos(){
        if(!this.formulario) return;

        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.valida(e);
        })
    }

    valida(e){
        const el = e.target;

        this.limpaErros();

        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let erro = false;

        console.log(emailInput);

        if(!validator.isEmail(emailInput.value)){
            this.criaErro("Email inválido", emailInput);
            erro = true;
        }

        if (passwordInput.value.length < 5 || passwordInput.value.length > 15) {
            this.criaErro("Senha inválida", passwordInput);
            erro = true;
        }

        if (erro) {
            const form = new FormData(this.formulario);
            localStorage.setItem('formData', JSON.stringify(form));
        }

        if (!erro) {
            el.submit();            
        }

    }

    limpaErros(){
        const errosAntigos = this.formulario.querySelectorAll('.invalid-feedback');
        errosAntigos.forEach(err => err.remove());

        const campos = this.formulario.querySelectorAll('.is-invalid');
        campos.forEach(campo => campo.classList.remove('is-invalid'));
    }

    criaErro(mensagem, campo){
        const div = document.createElement('div');
        div.innerHTML = mensagem;
        div.classList.add('invalid-feedback');
        campo.classList.add('is-invalid');
        campo.insertAdjacentElement('afterend', div);
    }
}