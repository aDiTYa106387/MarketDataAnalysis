const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const axios = require('axios');

// Fetch & Seed Data
router.get('/init', async(req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({});
        await Transaction.insertMany(response.data);
        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        res.status(500).send('Error initializing database');
    }
});

// List Transactions with Search & Pagination
router.get('/transactions', async(req, res) => {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const query = {};

    if (month) query.dateOfSale = { $regex: month, $options: 'i' };
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ];
    }

    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));

    res.json(transactions);
});

// Statistics API
router.get('/statistics', async(req, res) => {
    const { month } = req.query;
    const query = month ? { dateOfSale: { $regex: month, $options: 'i' } } : {};

    const totalSales = await Transaction.aggregate([
        { $match: query },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } }
    ]);

    const totalSold = await Transaction.countDocuments({...query, soldStatus: true });
    const totalNotSold = await Transaction.countDocuments({...query, soldStatus: false });

    res.json({
        totalSales: totalSales[0] ? .totalAmount || 0,
        totalSold,
        totalNotSold
    });
});

// Bar Chart API
router.get('/barchart', async(req, res) => {
    const { month } = req.query;
    const query = month ? { dateOfSale: { $regex: month, $options: 'i' } } : {};

    const priceRanges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const rangeCounts = await Promise.all(priceRanges.map(async(range, idx) => {
        const count = await Transaction.countDocuments({
            ...query,
            price: { $gte: range, $lt: priceRanges[idx + 1] || Infinity }
        });
        return { range: `${range}-${priceRanges[idx + 1] || 'above'}`, count };
    }));

    res.json(rangeCounts);
});

// Pie Chart API
router.get('/piechart', async(req, res) => {
    const { month } = req.query;
    const query = month ? { dateOfSale: { $regex: month, $options: 'i' } } : {};

    const categories = await Transaction.aggregate([
        { $match: query },
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(categories);
});

module.exports = router;
