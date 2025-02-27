function iniciarLancamentos() {
    const qtdLancamentos = document.getElementById('qtdLancamentos').value;
    const intervaloLancamentos = document.getElementById('intervaloLancamentos').value;

    fetch('/lancar?numLancamentos=${numLancamentos}&intervalo=${intervalo}')
        .then(response => response.json())
        .then(data => {
            atualizarGraficos(data);
        });
}