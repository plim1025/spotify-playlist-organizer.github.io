const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    album: String,
    artists: [
        String
    ],
    danceability: Number,
    duration: Number,
    energy: Number,
    id: String,
    instrumentalness: Number,
    key: Number,
    liveness: Number,
    loudness: Number,
    name: String,
    popularity: Number,
    preview: String,
    speechiness: Number,
    tempo: Number,
    time_signature: Number,
    valence: Number
});

const Song = mongoose.model('song', SongSchema);

module.exports = Song;