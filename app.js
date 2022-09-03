// moved this variable to global scope to make bar colors dynamic
const bgColor = []
const hoverColor = []
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
        dynamicChart.config.data.labels = days;
        dynamicChart.config.data.datasets[0].data = values;
        // give bar with highest value a different color
        const max = Math.max(...values)
        const highestValueColor = values.map((datapoint, index) => {
            const color = datapoint === max ? 'rgba(118, 181, 188, 1)' : 'rgba(236, 119, 95, 1)';
            bgColor.push(color)
        })
        // lower opacity on hover
        const onHoverColor = values.map((datapoint, index) => {
            const color = datapoint === max ? 'rgba(118, 181, 188, 0.6)' : 'rgba(236, 119, 95, 0.6)';
            hoverColor.push(color)
        })
        const labelDays = days.push()
        console.log(bgColor);
        console.log(hoverColor);
        console.log(max)
        console.log(days);
        console.log(values);
        dynamicChart.update();
    }); 


    // set up the chart
    const data = {
        labels: [],
        datasets: [{
            backgroundColor: bgColor,
            hoverBackgroundColor: hoverColor,
            borderRadius: '3',
                
        }],
    }
    // customize tooltip title
    const titleTooltip = (tooltipItems) => {
        return ;
    }
        // configure the chart
        const config = {
            type: 'bar',
            data,
            options: {
                // change cursor pointer hover color
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                    // below is a more elaborate way to get the same result
                    // if (chartElement.length == 1) {
                    //     event.native.target.style.cursor = 'pointer';
                    // }
                    // if (chartElement.length == 0) {
                    //     event.native.target.style.cursor = 'default';
                    // }
                },
                // hide the legend
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'hsl(25, 47%, 15%)',
                        yAlign: 'none',
                        caretPadding: 50,
                        displayColors: false,
                        // tooltip label
                        callbacks: {
                            title: titleTooltip
                        }
                    }
                },
                // hide the grid lines
                scales: {
                    y: {
                        display: false,
                    },
                    x: {
                        display: true,
                        ticks: {
                            color: 'hsl(28, 10%, 53%)',
                        },
                        grid: {
                            color: 'white',
                            borderColor: 'white'
                        }
                    }
                }
            }
        };

        // Render the chart
        const dynamicChart = new Chart(
            document.getElementById('dynamic-chart'),
            config
        );
};        
updateChart();

