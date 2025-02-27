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

    const configCoroas = {
        type: 'line',
        data: {
            labels: data.labels,
        }
    }

    /* 
    Base gráfico em Chart.js
    const config = {
        type: 'line',
        data: data,
    };

    data.datasets[index] - options for this dataset only
    options.datasets.line - options for all line datasets
    options.elements.line - options for all line elements
    options.elements.point - options for all point elements
    options - options for the whole chart

    Exemplo aplicado 
    var ctx = document.getElementById('myChart').getContext('2d');
    var earning = document.getElementById('earning').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Youtube', 'Twitter', 'Spotify'],
            datasets: [{
                label: 'Número Seguidores (em Milhões)',
                data: [8.27, 2.3, 11.9],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(75, 192, 192, 1)' 
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
        }]
        },
        options: {
        responsive: true,
        }
    });


    var myChart = new Chart(earning, {
        type: 'bar',
        data: {
            labels: ['Super Lady', 'Revenge', 'Doll', 'Vision', '7Days', 'Fate', 'Rollie', 'Wife'],
            datasets: [{
                label: 'Número Visualizações (em Milhões)',
                data: [136, 5.6, 3.7, 1.7, 2.8, 88, 3.1, 99],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
        }]
        },
        options: {
        responsive: true,
        }
    });
    */
}