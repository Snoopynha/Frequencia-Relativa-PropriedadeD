function iniciarLancamentos() {
    const qtdLancamentos = document.getElementById('qtdLancamentos').value;
    const intervaloLancamentos = document.getElementById('intervaloLancamentos').value;

    fetch('/lancar?numLancamentos=${numLancamentos}&intervalo=${intervalo}')
        .then(response => response.json())
        .then(data => {
            atualizarGraficos(data);
        });
}

function atualizarGraficos(data) {
    const ctxCaras = document.getElementById('graficoCaras').getContext('2d');
    const ctxCoroas = document.getElementById('graficoCoroas').getContext('2d');

    /* 
    Base gráfico em Chart.js
    const config = {
        type: 'line',
        data: data,
    };
    */
}