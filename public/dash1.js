const ctx = document.getElementById('lineChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Weverton', 'G.Gómez', 'Murilo', 'Giay', 'Piquerez', 'R.Rios', 'F.Torres', 'F.Lópes', 'R.Veiga', 'V.Roque', 'Estevão'],
        datasets: [{
            label: 'Votos',
            data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            backgroundColor: [
                'rgb(35, 119, 35)'
            ],
            borderColor: [
                'rgb(41,155,99'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});