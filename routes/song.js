const express = require('express');
const router = express.Router();
const Song = require('../models');

router.get('/song', async(req, res) => {
    const songs = await Song.find({}).lean();
    console.log(songs)
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
                valence: req.body.valence,
                year: parseInt(req.body.album.release_date.substring(0, 5))
            });
            song.save(e => e ? console.log(e) : null);
        }
    });
});

router.post('/songs', (req, res) => {
    const pastIDs = [];
    const songs = req.body.map(song => {
        const newSong =  pastIDs.includes(song.id) ? 
            null: {
                album: song.album.name,
                artists: song.artists.map(artist => artist.name),
                danceability: song.danceability,
                duration: song.duration_ms,
                energy: song.energy,
                id: song.id,
                instrumentalness: song.instrumentalness,
                key: song.key,
                liveness: song.liveness,
                loudness: song.loudness,
                name: song.name,
                popularity: song.popularity,
                preview: song.preview_url,
                speechiness: song.speechiness,
                tempo: song.tempo,
                time_signature: song.time_signature,
                valence: song.valence,
                year: parseInt(song.album.release_date.substring(0, 5))
            }
        pastIDs.push(song.id);
        return newSong;
    });
    Song.insertMany(songs)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err));
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