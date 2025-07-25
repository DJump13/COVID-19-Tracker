import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    plugins:{
        legend: {
                display: false
        }
    },
    elements: {
        point: {
            radius: 0
        }
    },
    responsive: true,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },
    scales: {
        x: {
            // type: "time",
            // time: {
            //     format: "MM/DD/YY",
            //     tooltipFormat: "ll"
            // }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                //include a dollar sign in the ticks
                callback: function (value, index, values){
                    return numeral(value).format("0a");
                }
            }
        }
    }
}

function LineGraph({ casesType = "cases", ...props}) {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType) => {
        let chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if(lastDataPoint){
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }

                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                let chartData = buildChartData(data, casesType);
                console.log(chartData);
                setData(chartData);
            })
        }
        
        fetchData();
    }, [casesType])

    

  return (
    <div className={props.className}>
        {data?.length > 0 && (
            <Line 
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: data
                        }
                    ]
                }}
            />
        )}
    </div>
  )
}

export default LineGraph
