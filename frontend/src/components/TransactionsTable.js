import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('March');

    useEffect(() => {
        axios.get(`/api/transactions?month=${month}&search=${search}`)
            .then(response => setTransactions(response.data))
            .catch(error => console.error(error));
    }, [month, search]);

    return ( <
        div >
        <
        input type = "text"
        placeholder = "Search..."
        value = { search }
        onChange = { e => setSearch(e.target.value) }
        /> <
        table >
        <
        thead >
        <
        tr >
        <
        th > Title < /th> <
        th > Description < /th> <
        th > Price < /th> <
        th > Category < /th> <
        th > Date of Sale < /th> <
        /tr> <
        /thead> <
        tbody > {
            transactions.map((transaction, index) => ( <
                tr key = { index } >
                <
                td > { transaction.title } < /td> <
                td > { transaction.description } < /td> <
                td > { transaction.price } < /td> <
                td > { transaction.category } < /td> <
                td > { transaction.dateOfSale } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
};

export default TransactionsTable;