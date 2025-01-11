import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieChart = ({ month }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        axios.get(`/api/piechart?month=${month}`)
            .then(response => {
                const labels = response.data.map(item => item._id);
                const data = response.data.map(item => item.count);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Category Distribution',
                        data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'
                        ]
                    }]
                });
            })
            .catch(error => console.error(error));
    }, [month]);

    return <Pie data = { chartData }
    />;
};

export default PieChart;