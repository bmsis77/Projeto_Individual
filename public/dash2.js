const ctx2 = document.getElementById('doughnut');

new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Certas', 'Erradas'],
        datasets: [{
            data: [42, 12],
            backgroundColor: [
                'rgba(41,155,99,1)',
                'rgba(54,162,235,1)'
            ],
            borderColor: [
                'rgba(41,155,99,1)',
                'rgba(54,162,235,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});