let graficoCarasInstance = null;
let graficoCoroasInstance = null;

function iniciarLancamentos() {
    const qtdLancamentos = document.getElementById('qtdLancamentos').value;
    const intervaloLancamentos = document.getElementById('intervaloLancamentos').value;

    fetch(`/lancar?qtdLancamentos=${qtdLancamentos}&intervaloLancamentos=${intervaloLancamentos}`)
        .then(response => response.json())
        .then(data => {
            atualizarGraficos(data);
    });
}

function atualizarGraficos(data) {
    const ctxCaras = document.getElementById('graficoCaras').getContext('2d');
    const ctxCoroas = document.getElementById('graficoCoroas').getContext('2d');

    // Se já existir um gráfico destroi
    if (graficoCarasInstance) {
        graficoCarasInstance.destroy();
    }
    if (graficoCoroasInstance) {
        graficoCoroasInstance.destroy();
    }

    const configCaras = {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Frequência de Caras',
                data: data.caras,
                borderColor: 'blue',
                fill: false
            }, {
                label: 'Linha de Estabilização',
                data: Array(data.labels.length).fill(0.5),
                borderColor: 'red',
                borderDash: [10,5],
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    };

    const configCoroas = {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Frequência de Coroas',
                data: data.coroas,
                borderColor: 'yellow',
                fill: false
            }, {
                label: 'Linha de Estabilização',
                data: Array(data.labels.length).fill(0.5),
                borderColor: 'red',
                borderDash: [10,5],
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    };

    graficoCarasInstance = new Chart(ctxCaras, configCaras);
    graficoCoroasInstance = new Chart(ctxCoroas, configCoroas);
}