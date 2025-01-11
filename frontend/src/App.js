import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function App() {
    const [month, setMonth] = useState('March');

    return (
        <div>
            <h1>Transaction Dashboard</h1>
            <select value={month} onChange={e => setMonth(e.target.value)}>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, index) => (
                    <option key={index} value={m}>{m}</option>
                ))}
            </select>

            <Statistics month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
            <TransactionsTable />
        </div>
    );
}

export default App;
