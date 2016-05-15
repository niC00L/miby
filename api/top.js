var express = require('express');
var router = express.Router();
var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

router.get('/', function(req, res, next) {
	
	data.search({
		"index": 'miby',
		"type": 'level',
		"body": {
			"query": {
				"sort" : [
				{
					"price" : {
						"order": "asc",
						"mode": "avg"
					}
				}
				],
				"aggs": {
					"per_user": {
						"terms": {
							"field": "name"
						}
					}
				}
			}
		}
	}).then(function (response) {
		res.send(response.hits.hits);
	}, function (error) {
		var err = new Error(error);
		err.status = 404;
		next(err);
	});

});

module.exports = router;