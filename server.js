const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const callbackRouter = require('./routes/callback');
const refreshRouter = require('./routes/refresh');
const songRouter = require('./routes/song');

const app = express();
dotenv.config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()).use(cors());
app.use(loginRouter);
app.use(callbackRouter);
app.use(refreshRouter);
app.use(songRouter);

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://plim1025:${process.env.SONGS_DB_PASSWORD}@songs-pvhve.mongodb.net/songs?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection
  .once('open', () => console.log('Connection has been made with mongoDB'))
  .on('error', e => console.log('Connection error with mongoDB: ' + e));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    let url = path.join(__dirname, '../client/dist', 'index.html');
    res.sendFile(url);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));