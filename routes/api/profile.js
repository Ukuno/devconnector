const express =  require('express');
const router = express.Router();

//@route   GET api/profile/test
//@desc    test for profile
//@access  Public
router.get('/test', (req, res) => res.json({ msg : 'this the profile page'}));

module.exports = router;