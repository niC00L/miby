var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next){

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

router.use('/level', require('./level'));
router.use('/time', require('./time'));
router.use('/top', require('./top'));

module.exports = router;