import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({ totalSales: 0, totalSold: 0, totalNotSold: 0 });

    useEffect(() => {
        axios.get(`/api/statistics?month=${month}`)
            .then(response => setStats(response.data))
            .catch(error => console.error(error));
    }, [month]);

    return ( 
    <div>
        <h3> Statistics
        for { month } </h3> 
        <p> Total Sales: $ { stats.totalSales } </p> 
        <p> Total Sold Items: { stats.totalSold } </p> 
        <p> Total Not Sold Items: { stats.totalNotSold } </p>
        </div>
    );
};

export default Statistics;