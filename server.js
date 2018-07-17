const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

//body parser 
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//database connection
const db = require('./config/key').mongoURI;

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

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