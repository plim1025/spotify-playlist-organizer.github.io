const express = require('express');
const router = express.Router();
const Song = require('../models');

router.get('/song', async(req, res) => {
    let songs;
    try {
        let categories = Object.keys(req.query).filter(category => category !== 'sortCategory' && category !== 'sortDirection');
        let filter = {};
        categories.forEach(category => {
            categoryArr = JSON.parse(req.query[category]);
            if(category === 'artists' || category === 'album' || category === 'year') {
                if(categoryArr.length) {
                    if(filter['$and']) {
                        filter['$and'].push({'$or': [{[category]: {$in: categoryArr}}, {[category]: {$exists: false}}]});
                    } else {
                        filter['$and'] = [{'$or': [{[category]: {$in: categoryArr}}, {[category]: {$exists: false}}]}];
                    }
                }
            } else {
                if(filter['$and']) {
                    filter['$and'].push({'$or': [{[category]: {$gte: categoryArr[0], $lte: categoryArr[1]}}, {[category]: {$exists: false}}]})
                } else {
                    filter['$and'] = [{'$or': [{[category]: {$gte: categoryArr[0], $lte: categoryArr[1]}}, {[category]: {$exists: false}}]}];
                }
            }
        });
        const sortCategory = req.query.sortCategory;
        const sortDirection = req.query.sortDirection
        if(sortCategory === 'artist') {
            songs = await Song.find(filter).sort({'artists.0': sortDirection});
        } else if(sortCategory) {
            songs = await Song.find(filter).sort({[sortCategory]: sortDirection});
        } else {
            songs = await Song.find(filter);
        }
    } catch(err) {
        console.log(err);
    }
    res.send(songs);
});

router.post('/song', (req, res) => {
    Song.countDocuments({id: req.body.id}, (err, count) => {
        if(err) {
            console.log(err)
        } else if(count === 0) {
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
                loudness: parseInt(req.body.loudness),
                name: req.body.name,
                popularity: req.body.popularity,
                preview: req.body.preview_url,
                speechiness: req.body.speechiness,
                tempo: parseInt(req.body.tempo),
                time_signature: req.body.time_signature,
                uri: req.body.uri,
                valence: req.body.valence,
                year: parseInt(req.body.album.release_date.substring(0, 5))
            });
            song.save(err => {
                if(err) {
                    console.log(err)
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.post('/songs', (req, res) => {
    const songs = req.body.map(song => {
        const parsedSong = {};
        ['album', 'artists', 'danceability', 'duration', 'energy', 'id', 'instrumentalness', 'key', 'liveness', 'loudness', 'name', 'popularity', 'preview', 'speechiness', 'tempo', 'time_signature', 'uri', 'valence', 'year'].forEach(field => {
            switch(field) {
                case 'album':
                    const album = song[field].name;
                    if(album) {
                        parsedSong[field] = album;
                    }
                    break;
                case 'artists':
                    const artists = song[field];
                    if(artists.length) {
                        parsedSong[field] = artists.map(artist => artist.name);
                    }
                    break;
                case 'duration':
                    const duration = song.duration_ms;
                    if(duration) {
                        parsedSong[field] = duration;
                    }
                    break;
                case 'loudness' || 'tempo':
                    const loudnessOrTempo = song[field];
                    if(loudnessOrTempo) {
                        parsedSong[field] = parseInt(loudnessOrTempo);
                    }
                    break;
                case 'preview':
                    const preview = song.preview_url;
                    if(preview) {
                        parsedSong[field] = preview;
                    }
                    break;
                case 'year':
                    const year = song.album.release_date;
                    if(year) {
                        parsedSong[field] = parseInt(year.substring(0, 5));
                    }
                    break;
                default:
                    const category = song[field];
                    if(category) {
                        parsedSong[field] = category;
                    }
            }
        });
        return parsedSong;
    });
    const filteredSongs = [];
    const pastIDs = [];
    for(let i = 0; i < songs.length; i++) {
        if(!pastIDs.includes(songs[i].id)) {
            filteredSongs.push(songs[i])
        }
        pastIDs.push(songs[i].id);
    }
    Song.insertMany(filteredSongs, err => {
        if(err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    })
});

// router.put('/song', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
    
//     console.log(req.body)
// });

router.delete('/song', (req, res) => {
    Song.deleteMany({}, (err) => {
        if(err) {
            console.log(err)
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;