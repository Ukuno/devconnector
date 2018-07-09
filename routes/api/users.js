const express =  require('express');
const router = express.Router();

//@route   GET api/users/test
//@desc    test for users
//@access  Public
router.get('/test', (req, res) => res.json({ msg : 'this the users page'}));

module.exports = router;