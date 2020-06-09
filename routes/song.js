const express = require('express');
const router = express.Router();
const Song = require('../models');

router.get('/song', async(req, res) => {
    let songs;
    try {
        if(Object.keys(req.query).length === 0) {
            songs = await Song.find({}).lean();
        } else {
            const sortBy = req.query.sortBy;
            const sortDirection = req.query.sortDirection;
            if(sortBy) {
                songs = await Song.find({}).sort({[sortBy]: sortDirection});
            }
        }
    } catch(err) {
        console.log(err)
    }
    res.send(songs);
});

router.post('/song', (req, res) => {
    Song.countDocuments({id: req.body.id}, (err, count) => {
        if (err) console.log(err)
        else if(count == 0) {
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
            song.save(err => {
                if(err) console.log(err)
                else res.sendStatus(200);
            });
        }
    });
});

router.post('/songs', (req, res) => {
    const songs = req.body.map(song => {
        return {
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
    });
    const filteredSongs = [];
    const pastIDs = [];
    for(let i = 0; i < songs.length; i++) {
        if(!pastIDs.includes(songs[i].id))
            filteredSongs.push(songs[i])
        pastIDs.push(songs[i].id);
    }
    Song.insertMany(filteredSongs, err => {
        if(err) console.log(err)
        else res.sendStatus(200)
    })
});

// router.put('/song', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
    
//     console.log(req.body)
// });

router.delete('/song', (req, res) => {
    Song.deleteMany({}, (err) => {
        if(err) console.log(err)
        else res.sendStatus(200)
    });
});

module.exports = router;