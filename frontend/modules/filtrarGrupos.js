
async function filtrarGrupos() {
    const botoesFiltro = document.querySelectorAll('.filtro-grupo');

    botoesFiltro.forEach(btn => {
        btn.addEventListener('click', () => {
            let grupo;
            //console.log(btn.innerText); //Grupo x

            if (btn.innerText == "Grupo A") {
                grupo = 'grupoa';
            } else if (btn.innerText == "Grupo B") {
                grupo = 'grupob';
            } else if (btn.innerText == "Grupo C") {
                grupo = 'grupoc';
            } else if (btn.innerText == "Grupo D") {
                grupo = 'grupod';
            } else if (btn.innerText == "Grupo E") {
                grupo = 'grupoe';
            } else if (btn.innerText == "Grupo F") {
                grupo = 'grupof';
            } else if (btn.innerText == "Todos") {
                grupo = 'todos';
            }

            const urlParams = new URLSearchParams(window.location.search);

            const parametro1 = urlParams.get('parametro1');

            try {
                const url = `/filtro/${grupo}`;
                console.log(url);

                window.location.href = url;
            } catch (e) {
                console.log(e);
            }
        })
    })

    const urlParams = window.location.pathname.split('/')[2];

    // Se houver parâmetros, faça algo com eles
    if (urlParams) {

        function formataNome(nome) {
            let grupo = nome.charAt(0).toUpperCase() + nome.slice(1, 5);
            let letra = nome.slice(5, 6);
            const nomeGrupo = [];
            nomeGrupo.push(grupo);
            nomeGrupo.push(letra.toUpperCase());

            let nomeFormatado = nomeGrupo.join(' ');

            return nomeFormatado;
        }

        let nomeGrupo = formataNome(urlParams);

        botoesFiltro.forEach((btn) => {
            if (btn.innerText == nomeGrupo.trim()) {
                btn.classList.add('selecionado');
            }
        })
    } else {
        const btnTodos = document.querySelector('.btn-todos');
        btnTodos.classList.add('selecionado');
    }
}

export default filtrarGrupos;