// wrap in function to update chart
function updateChart() {
    const bgColor = []
    const hoverColor = []
//  create function to retrieve JSON data
    function getData() {
        const myData = 'http://127.0.0.1:5500/data.json';
        
        const response = fetch(myData)

        // turn data into JS readable JSON
        const datapoints = response.json();

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
    let titleTooltip = (tooltipItems) => {
        tooltipItems.forEach(function(tooltipItem) {
        tooltiplabel = '$' + tooltipItem.raw.toLocaleString();
        });
        console.log(tooltipItems[0].raw);
        return tooltiplabel;
        }

        // configure the chart
        const config = {
            type: 'bar',
            data,
            options: {
                layout: {
                    padding: {
                        top: 30,
                        left: 12,
                        right: 12
                    }
                },
                // change cursor pointer hover color
                onHover: (event, chartElement) => {
                    // if statement for hover on/off bars
                    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                },
                // hide the legend
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        position: 'nearest',
                        backgroundColor: 'hsl(25, 47%, 15%)',
                        caretPadding: 10,
                        caretSize: 0,
                        yAlign: 'bottom',
                        displayColors: false,
                        padding: 8,
                        // hide the title
                        bodyFont: {
                            size: 0
                        },
                        titleFont: {
                            weight: 'normal',
                            size: 16
                        },
                        titleMarginBottom: 0,
                        // tooltip label
                        callbacks: {
                            title: titleTooltip,
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
                            color: 'hsl(33, 100%, 98%)',
                            borderColor: 'hsl(33, 100%, 98%)'
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

