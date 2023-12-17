import validator from "validator";

export default class Valida {
    constructor(formulario) {
        this.formulario = document.querySelector(formulario);
        // this.mensagem = document.querySelector('#id-flash-messages');
    }

    inicializa() {
        this.eventos();
    }

    eventos() {
        if (!this.formulario) return;

        this.formulario.addEventListener('submit', e => {
            e.preventDefault();
            this.valida(e);
        })

        this.configuraInputGrupo();
    }

    configuraInputGrupo() {
        const inputGrupo = document.querySelector("#inputGrupo");

        inputGrupo.addEventListener("change", () => {
            const grupoSelecionado = inputGrupo.value;
            const inputSenha = document.querySelector('#inputSenhaGrupo');

            if (grupoSelecionado !== "Nenhum") {
                inputSenha.style.display = "block";
                inputSenha.placeholder = `Informe a senha do ${grupoSelecionado}`;
            } else {
                inputSenha.style.display = "none";
            }
        });
    }

    valida(e) {
        const el = e.target;

        this.limpaErros();

        const nomeInput = el.querySelector('input[name="nome"]');
        const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const confirmPasswordInput = el.querySelector('input[name="confirmPassword"]');
        const inputGrupo = document.querySelector('#inputGrupo');
        const senhaGrupoInput = el.querySelector('input[name="senhaGrupo"]');
        let erro = false

        if (nomeInput.value == '') {
            this.criaErro("Nome é um campo obrigatório", nomeInput);
            erro = true
        }

        if (sobrenomeInput.value == '') {
            this.criaErro("Sobrenome é um campo obrigatório", sobrenomeInput);
            erro = true
        }

        if (!validator.isEmail(emailInput.value)) {
            this.criaErro("E-mail inválido", emailInput);
            erro = true;
        }

        if (passwordInput.value.length < 5 || passwordInput.value.length > 15) {
            this.criaErro("Senha inválida", passwordInput);
            erro = true;
        }

        if (passwordInput.value != confirmPasswordInput.value) {
            this.criaErro("As senhas precisam ser iguais", confirmPasswordInput);
            erro = true
        }

        if (inputGrupo.value == 'Grupo A') {
            if (senhaGrupoInput.value != 'GRUPOA') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        } else if (inputGrupo.value == 'Grupo B') {
            if (senhaGrupoInput.value != 'GRUPOB') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        } else if (inputGrupo.value == 'Grupo C') {
            if (senhaGrupoInput.value != 'GRUPOC') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        } else if (inputGrupo.value == 'Grupo D') {
            if (senhaGrupoInput.value != 'GRUPOD') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        } else if (inputGrupo.value == 'Grupo E') {
            if (senhaGrupoInput.value != 'GRUPOE') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        } else if (inputGrupo.value == 'Grupo F') {
            if (senhaGrupoInput.value != 'GRUPOF') {
                this.criaErro("Senha do grupo incorreta", senhaGrupoInput);
                erro = true;
            };
        }



        // APENAS ISSO RESOLVEU O SALVAR OS DADOS SE DER UM ERRO NO FORMULÁRIO??
        if (erro) {
            const form = new FormData(this.formulario);
            localStorage.setItem('formData', JSON.stringify(form));
        }

        if (!erro) {
            el.submit();            
        }

    }

    limpaErros() {
        const errosAntigos = this.formulario.querySelectorAll('.invalid-feedback');
        errosAntigos.forEach(erro => erro.remove());
    
        const campos = this.formulario.querySelectorAll('.is-invalid');
        campos.forEach(campo => campo.classList.remove('is-invalid'));
    }


    criaErro(mensagem, campo) {
        const div = document.createElement('div');
        div.innerHTML = mensagem;
        div.classList.add('invalid-feedback');
        campo.classList.add('is-invalid');
        campo.insertAdjacentElement('afterend', div);

    }
}