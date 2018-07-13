const express =  require('express');
const router = express.Router();

//model of the user
const User = require('../../models/user');

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
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    avatar

                });
            }
        })
})

module.exports = router;