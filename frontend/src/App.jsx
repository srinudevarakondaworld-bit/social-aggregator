import React, { useState } from 'react';

function App() {
  // Twitter States
  const [username, setUsername] = useState('');
  const [tweets, setTweets] = useState([]);
  const [tweetLoading, setTweetLoading] = useState(false);
  const [searchedUser, setSearchedUser] = useState('');

  // YouTube States
  const [ytQuery, setYtQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [ytLoading, setYtLoading] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState('');

  // Twitter Fetch Logic
  const fetchTweets = () => {
    if (!username.trim()) {
      alert('Please enter a Twitter username');
      return;
    }
    setTweetLoading(true);
    setTimeout(() => {
      const mockTweets = [
        {
          id: 1,
          text: `🚀 Hello Twitter! This is a live-tracked tweet from @${username}'s account regarding latest tech updates and web development project status.`,
          public_metrics: { like_count: 125, retweet_count: 45 }
        },
        {
          id: 2,
          text: `📊 Successfully launched the Social Aggregator Dashboard using React and Node.js. Monitoring clean data flow across platforms! #Coding #JS`,
          public_metrics: { like_count: 340, retweet_count: 89 }
        }
      ];
      setTweets(mockTweets);
      setSearchedUser(username);
      setTweetLoading(false);
    }, 600);
  };

  // YouTube Search Logic (New Feature)
  const searchYouTube = () => {
    if (!ytQuery.trim()) {
      alert('Please enter a search topic for YouTube');
      return;
    }
    setYtLoading(true);
    setTimeout(() => {
      const mockVideos = [
        {
          id: 'yt1',
          title: `How to master React and Node.js in 2026 - Complete Guide about ${ytQuery}`,
          channel: 'Tech Academy Telugu',
          views: '12K views',
          time: '2 days ago',
          thumbnail: '📺'
        },
        {
          id: 'yt2',
          title: `Live Ground Report & Analysis regarding ${ytQuery} | Latest Updates`,
          channel: 'Regional Media Network',
          views: '45K views',
          time: '5 hours ago',
          thumbnail: '🎥'
        }
      ];
      setVideos(mockVideos);
      setSearchedQuery(ytQuery);
      setYtLoading(false);
    }, 600);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlignment: 'center', marginBottom: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#0f1419', margin: '0', fontSize: '28px' }}>🌐 Multi-Social Aggregator Dashboard</h1>
          <p style={{ color: '#536471', margin: '5px 0 0 0' }}>Track multiple social media platforms in one single place</p>
        </div>

        {/* ---------------- TWITTER SECTION ---------------- */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h2 style={{ color: '#1da1f2', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0' }}>🐦 Twitter Feed Tracker</h2>
          <p style={{ color: '#657786', fontSize: '14px' }}>Enter username to view dynamic timeline feeds</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Enter Twitter Username (e.g. elonmusk)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '12px', width: '75%', borderRadius: '8px', border: '1px solid #ccd6dd', fontSize: '15px' }}
            />
            <button onClick={fetchTweets} disabled={tweetLoading} style={{ padding: '12px 20px', backgroundColor: '#1da1f2', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              {tweetLoading ? 'Loading...' : 'Get Tweets'}
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            {tweets.length > 0 && <h4 style={{ color: '#14171a', borderBottom: '2px solid #1da1f2', paddingBottom: '5px', width: 'fit-content' }}>Latest Tweets for @{searchedUser}</h4>}
            {tweets.map((tweet) => (
              <div key={tweet.id} style={{ borderBottom: '1px solid #e1e8ed', padding: '15px 0' }}>
                <p style={{ fontSize: '15px', color: '#14171a', lineHeight: '1.5', margin: '0' }}>{tweet.text}</p>
                <div style={{ display: 'flex', gap: '20px', color: '#657786', fontSize: '13px', marginTop: '10px' }}>
                  <span style={{ color: '#e0245e' }}>❤️ {tweet.public_metrics.like_count} Likes</span>
                  <span style={{ color: '#17bf63' }}>🔁 {tweet.public_metrics.retweet_count} Retweets</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- YOUTUBE SECTION (NEW) ---------------- */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#ff0000', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0' }}>🛑 YouTube Search Monitor</h2>
          <p style={{ color: '#657786', fontSize: '14px' }}>Search any topic to monitor related video uploads and metrics</p>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Enter Search Topic (e.g. Web Development, News)"
              value={ytQuery}
              onChange={(e) => setYtQuery(e.target.value)}
              style={{ padding: '12px', width: '75%', borderRadius: '8px', border: '1px solid #ccd6dd', fontSize: '15px' }}
            />
            <button onClick={searchYouTube} disabled={ytLoading} style={{ padding: '12px 20px', backgroundColor: '#ff0000', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>
              {ytLoading ? 'Searching...' : 'Search Videos'}
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            {videos.length > 0 && <h4 style={{ color: '#14171a', borderBottom: '2px solid #ff0000', paddingBottom: '5px', width: 'fit-content' }}>Video Results for "{searchedQuery}"</h4>}
            {videos.map((vid) => (
              <div key={vid.id} style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #e1e8ed', padding: '15px 0', alignItems: 'center' }}>
                <div style={{ fontSize: '30px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #e1e8ed' }}>{vid.thumbnail}</div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f1419', margin: '0 0 5px 0', lineHeight: '1.4' }}>{vid.title}</p>
                  <p style={{ fontSize: '14px', color: '#536471', margin: '0' }}>{vid.channel}</p>
                  <p style={{ fontSize: '12px', color: '#657786', margin: '3px 0 0 0' }}>📊 {vid.views} • 🕒 {vid.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;