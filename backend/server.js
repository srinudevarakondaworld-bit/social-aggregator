const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const twitterRoutes = require('./routes/twitter');
app.use('/api/twitter', twitterRoutes);

app.get('/', (req, res) => {
    res.send('Social Aggregator API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});