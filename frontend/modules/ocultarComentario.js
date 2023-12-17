function toogleComentario() {
    let botaoChat = document.querySelectorAll('.botaoChat')
    let feedback = document.querySelectorAll('.feedback');
    let fecharFeedback = document.querySelectorAll('.btn-fechar');

    botaoChat.forEach((botao, index) => {
        botao.addEventListener("click", () => {

            if (feedback[index].classList.contains('transparente')) {
                feedback[index].classList.replace('transparente', 'comentario-padrao');
                feedback[index].classList.add('aberto');
            }else if(feedback[index].classList.contains('comentario-padrao')){
                feedback[index].classList.replace('comentario-padrao', 'transparente');
            
                feedback[index].classList.add('fechado');
            } else {
                feedback[index].classList.add('comentario-padrao');
            }
        })
    })

    fecharFeedback.forEach((fecharBtn, index) => {
        fecharBtn.addEventListener('click', () => {
            feedback[index].classList.replace('comentario-padrao', 'transparente');
        });
    });

}

export default toogleComentario;