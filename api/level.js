var express = require('express');
var router = express.Router();
var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

router.post('/', function(req, res, next) {
	
	if(!req.body.hasOwnProperty("success") || !req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("seed") || !req.body.hasOwnProperty("generator") || !req.body.hasOwnProperty("level") || !req.body.hasOwnProperty("value") || !req.body.hasOwnProperty("time")) {
		var err = new Error("Missing arguments");
		err.status = 400;
		next(err);
		return;
	}

	data.create({
		index: 'miby',
		type: 'level',
		body: {
			success: req.body.success,
			session: req.session.id,
			name: req.body.name,
			seed: parseInt(req.body.seed),
			generator: parseInt(req.body.generator),
			level: parseInt(req.body.level),
			value: parseInt(req.body.value),
			date: new Date().toISOString().substring(0, 10),
			time: parseInt(req.body.time),
			start: req.body.start,
			moves: req.body.moves
		}
	}, function (response) {
		console.log(response);
		res.send({"success": true});
	}, function(error) {
		var err = new Error(error);
		err.status = 404;
		next(err);
		return;
	});

});

module.exports = router;