var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next){

    res.set('Access-Control-Allow-Origin', '*');

    next();
});

router.use('/level', require('./level'));
router.use('/time', require('./time'));
router.use('/top', require('./top'));

module.exports = router;