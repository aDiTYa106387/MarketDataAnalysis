import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        axios.get(`/api/barchart?month=${month}`)
            .then(response => {
                const labels = response.data.map(item => item.range);
                const data = response.data.map(item => item.count);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Price Range Distribution',
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }]
                });
            })
            .catch(error => console.error(error));
    }, [month]);

    return <Bar data = { chartData }
    />;
};

export default BarChart;
