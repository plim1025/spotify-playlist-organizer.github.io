const express = require('express');
const router = express.Router();
const queryString = require('querystring');
const request = require('request');

router.get('/refresh', (req, res) => {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const uri = (process.env.FRONTEND_URI || 'http://localhost:8080') + '?'
                
            const options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            request.get(options, (err, response, body) => {
                res.redirect(uri + 
                    queryString.stringify({
                        access_token: access_token,
                        user_id: body.id
                    })
                );
            })
        } else {
            res.redirect('#' +
                queryString.stringify({
                    error: 'invalid_token'
                })
            );
        }
    });
});

module.exports = router;