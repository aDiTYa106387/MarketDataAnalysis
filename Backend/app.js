const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/transactionsDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error(err));

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
