function adicionarParticipante() {

    const botaoAdicionarParticipante = document.getElementById('botaoAdicionarParticipante');

    botaoAdicionarParticipante.addEventListener('click', () => {
            const container = document.getElementById('participantes-container');
            const participantesInputs = container.querySelectorAll('input[name^="participantes"]');
            const participanteNumber = participantesInputs.length + 1;

            const label = document.createElement('label');
            label.setAttribute('for', `participante${participanteNumber}`);
            label.textContent = `Participante ${participanteNumber}:`;

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', 'participantes[]');
            input.setAttribute('required', '');

            container.appendChild(label);
            container.appendChild(input);
    })
}

export default adicionarParticipante;