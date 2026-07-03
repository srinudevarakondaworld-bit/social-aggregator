const express = require('express');
const router = express.Router();

router.get('/user/:username', (req, res) => {
    res.json({ message: `Fetching tweets for ${req.params.username}` });
});

router.get('/search', (req, res) => {
    res.json({ message: `Searching for ${req.query.query}` });
});

module.exports = router;