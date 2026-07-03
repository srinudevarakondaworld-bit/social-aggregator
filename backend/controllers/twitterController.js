exports.getTweetsByUsername = async (req, res) => {
    res.json({ message: `Controller: Fetching tweets for ${req.params.username}` });
};

exports.searchTweets = async (req, res) => {
    res.json({ message: `Controller: Searching for ${req.query.query}` });
};