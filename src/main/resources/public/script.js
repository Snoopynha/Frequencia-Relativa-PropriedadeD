let graficoCarasInstance = null;
let graficoCoroasInstance = null;

function iniciarLancamentos() {
    const qtdLancamentos = document.getElementById('qtdLancamentos').value;
    const intervaloLancamentos = document.getElementById('intervaloLancamentos').value;
    const coinElement = document.getElementById('coin');

    coinElement.classList.add('flipping');

    fetch(`/lancar?qtdLancamentos=${qtdLancamentos}&intervaloLancamentos=${intervaloLancamentos}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                coinElement.classList.remove('flipping');
                atualizarGraficos(data);
            }, 1000);
    });
}

function limparGraficos() {
    if (graficoCarasInstance) graficoCarasInstance.destroy();
    if (graficoCoroasInstance) graficoCoroasInstance.destroy();
    document.getElementById('meuForm').reset();
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

    // Configuração comum para os dois gráficos
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        elements: { point: { radius: 2 } },
        scales: {
            y: {
                min: 0,
                max: 1,
                title: { display: true, text: 'Frequência Relativa' }
            },
            x: { title: { display: true, text: 'Número de Lançamentos' } }
        }
    };

    const datasetEstabilizacao = {
        label: 'Estabilização (0.5)',
        data: Array(data.labels.length).fill(0.5),
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        borderDash: [5, 5]
    };

    graficoCarasInstance = new Chart(ctxCaras, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Caras', data: data.caras, borderColor: '#3498db', fill: false },
                datasetEstabilizacao
            ]
        },
        options: commonOptions
    });

    graficoCoroasInstance = new Chart(ctxCoroas, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                { label: 'Coroas', data: data.coroas, borderColor: '#f1c40f', fill: false },
                datasetEstabilizacao
            ]
        },
        options: commonOptions
    });
}