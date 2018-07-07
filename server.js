const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = require('./config/key').mongoURI;

app.get('/', (req, res) => res.send("hello world!!"));

mongoose.connect(db)
        .then(()=> console.log('db is connected'))
        .catch( err => console.log(err));

        
const port = process.env.PORT || 5000;
app.listen( port, () => console.log('its live'));