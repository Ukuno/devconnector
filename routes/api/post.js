const express =  require('express');
const router = express.Router();

//@route   GET api/post/test
//@desc    test for post
//@access  Public
router.get('/test', (req, res) => res.json({ msg : 'this the post page'}));

module.exports = router;