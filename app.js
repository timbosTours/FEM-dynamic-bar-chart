// wrap in function to update chart
function updateChart() {
    //  create function to retrieve JSON data
    async function getData() {
        const myData = 'http://127.0.0.1:5500/data.json';
        const response = await fetch(myData)

        // turn data into JS readable JSON
        const datapoints = await response.json();

        return datapoints;
    }

    // get the data from the JSON file
    getData().then(datapoints => {
        const days = datapoints.map(
            (index) => {
                return index.day;
            })
        const values = datapoints.map(
            (index) => {
                return index.amount;
            })
        // append the data to the chart
        myChart.config.data.labels = days;
        myChart.config.data.datasets[0].data = values;
        console.log(days);
        console.log(values);
        myChart.update();
    });

    const ctx = document.getElementById('dynamic-chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'hotpink'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
updateChart();