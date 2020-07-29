const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    album: String | null,
    artists: [
        String | null
    ],
    danceability: Number | null,
    duration: Number | null,
    energy: Number | null,
    id: String | null,
    instrumentalness: Number | null,
    key: Number | null,
    liveness: Number | null,
    loudness: Number | null,
    name: String | null,
    popularity: Number | null,
    preview: String | null,
    speechiness: Number | null,
    tempo: Number | null,
    time_signature: Number | null,
    uri: String | null,
    valence: Number | null,
    year: Number | null
});

const Song = mongoose.model('song', SongSchema);

module.exports = Song;