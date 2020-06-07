const express = require('express');
const router = express.Router();
const Song = require('../models');

router.get('/song', async(req, res) => {
    const songs = await Song.find({}).lean();
    res.send(songs);
});

router.post('/song', async(req, res) => {
    await Song.countDocuments({id: req.body.id}, (err, count) => {
        if(count == 0) {
            const song = new Song({
                album: req.body.album.name,
                artists: req.body.artists.map(artist => artist.name),
                danceability: req.body.danceability,
                duration: req.body.duration_ms,
                energy: req.body.energy,
                id: req.body.id,
                instrumentalness: req.body.instrumentalness,
                key: req.body.key,
                liveness: req.body.liveness,
                loudness: req.body.loudness,
                name: req.body.name,
                popularity: req.body.popularity,
                preview: req.body.preview_url,
                speechiness: req.body.speechiness,
                tempo: req.body.tempo,
                time_signature: req.body.time_signature,
                valence: req.body.valence
            });
            song.save(e => e ? console.log(e) : null);
        }
    });
    res.sendStatus(200);
});

// router.put('/song', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
    
//     console.log(req.body)
// });

router.delete('/song', async(req, res) => {
    await Song.deleteMany({});
    res.sendStatus(200);
});

module.exports = router;