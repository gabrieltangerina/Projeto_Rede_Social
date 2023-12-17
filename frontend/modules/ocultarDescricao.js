function toggleDescricao() {
    let descricoes = document.querySelectorAll('.descricao');
    
    descricoes.forEach((descricao) => {
        // getComputedStyle para obter a altura computada, mesmo se ela estiver definida em uma folha de estilo externa.
        let altura = parseFloat(getComputedStyle(descricao).height);
        if(altura > 100){
            if(descricao.classList.contains('descricaoPadrao')){
                descricao.classList.replace('descricaoPadrao', 'recolhido');
            }else{
                descricao.classList.add('recolhido');
            }
            
            adicionarBotaoLerMais(descricao);
        }else{
            descricao.classList.replace("recolhido", 'descricaoPadrao');
        }
    })
        
    let botaoLerMais = document.querySelectorAll('.ler-mais-btn');
    botaoLerMais.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            descricoes[index].classList.toggle('recolhido');
            atualizarTextoBotao(botao);
        });
    });

    function adicionarBotaoLerMais(descricao) {
        let novoElemento = document.createElement('p');
        novoElemento.innerHTML = 'Ler mais';
        novoElemento.classList.add('ler-mais-btn');
        descricao.parentNode.insertBefore(novoElemento, descricao.nextSibling);
    }

    function atualizarTextoBotao(botao) {
        if (botao.innerHTML === 'Ler mais') {
            botao.innerHTML = 'Ler menos';
        } else {
            botao.innerHTML = 'Ler mais';
        }
    }
}

export default toggleDescricao;