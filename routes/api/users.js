const express =  require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt  =  require('jsonwebtoken');

//model of the user
const User = require('../../models/user');

//config file
const keys = require('../../config/key');

//@route   GET api/users/test
//@desc    test for users
//@access  Public
router.get('/test', (req, res) => res.json({ msg : 'this the users page'}));


//@route   POST api/users/register
//@desc    register
//@access  Public
router.post('/register', (req, res) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email : 'Email already exists'});
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    avatar
                });
                bcrypt.genSalt(10,(err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                    });
                });

            }
        })
});

//@route   POST api/users/login
//@desc    login
//@access  Public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(404).json({email : 'user not found'});
            } 

            //check if password match
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    // res.json({ msg : 'user success'});
                    const payload = { id: user.id,  name : user.name, avatar :user.avatar};

                    //sign Token JWT
                    jwt.sign(payload, keys.secretWord, { expiresIn : 3600 }, (err, token) => {

                        if(err) throw err;
                        res.json({
                            success : true,
                            token: 'Bearer ' + token
                        });
                    } )
                } else {
                   return res.status(400).json({ msg : 'failed to login'});
                }
            });
        });
});

module.exports = router;