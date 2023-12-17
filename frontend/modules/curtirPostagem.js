function curtirPostagem() {
    document.addEventListener('DOMContentLoaded', function () {
        const botoesCurtir = document.querySelectorAll('.btn-curtir');

        botoesCurtir.forEach((botao) => {
            botao.addEventListener('click', async function (event) {
                event.preventDefault();

                const postagemId = this.getAttribute('data-postagem-id');

                try {
                    const csrfToken = document.querySelector('input[name="_csrf"]').value;
                    const user = document.querySelector('input[name="user"]').value;

                    const url = `/curtida/${postagemId}/${user}`;

                    window.location.href = url;

                } catch (error) {
                    console.error('Erro durante a requisição de curtida:', error);
                }
            });
        });
    });
}

export default curtirPostagem;
