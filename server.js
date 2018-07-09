const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const db = require('./config/key').mongoURI;

app.get('/', (req, res) => res.send("hello world!!"));

mongoose.connect(db)
        .then(()=> console.log('db is connected'))
        .catch( err => console.log(err));

// app routers

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);


//port for the browser
const port = process.env.PORT || 5000;
app.listen( port, () => console.log('its live'));