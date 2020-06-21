const express = require('express');
const router = express.Router();
const queryString = require('querystring');

const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie('spotify_auth_state', state);
    res.redirect('https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: 'user-library-read playlist-read-private playlist-modify-public playlist-modify-private',
            state: state,
            redirect_uri: redirect_uri
        })
    );
});

module.exports = router;