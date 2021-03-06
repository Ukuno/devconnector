const express =  require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt  =  require('jsonwebtoken');
const passport = require('passport');

//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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

    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
       return res.status(400).json(errors);
    }

    User.findOne({email : req.body.email})
        .then(user => {
            if(user){
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
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
                    if(err) throw err;
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
    const { errors, isValid } = validateLoginInput(req.body);

    //check validation
    if(!isValid){
       return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = 'user not found'
                return res.status(404).json(errors);
            } 

            //check if password match
            bcrypt.compare(password, user.password)
            .then(isMatch => {
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
                    errors.password = 'password incorrect';
                   return res.status(400).json(errors);
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

//@route   POST api/users/admin
//@desc    user account
//@access  private
router.get('/current', passport.authenticate('jwt', { session : false }), (req,res) => {
    res.json({msg : 'success'});
});

module.exports = router;