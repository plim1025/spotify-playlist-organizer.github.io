const express = require('express');
const router = express.Router();
const queryString = require('querystring');
const request = require('request');

const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';

router.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies.spotify_auth_state : null;
    if(state === null || state !== storedState) {
        res.redirect('#' +
            queryString.stringify({
                error: 'state_mismatch'
            })
        );
    } else {
        res.clearCookie('spotify_auth_state');
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code' 
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, (err, response, body) => {
            if(!err && response.statusCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;
                const uri = (process.env.FRONTEND_URI || 'http://localhost:8080') + '/playlists?'
                
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                request.get(options, (err, response, body) => {
                    res.redirect(uri + 
                        queryString.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token,
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
    }
});

module.exports = router;