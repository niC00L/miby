var express = require('express');
var router = express.Router();
var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

router.get('/', function(req, res, next) {

    var query = {
        "index": 'miby',
        "type": 'level',
        "body": {
            "aggs": {
                "per_user": {
                    "terms": {
                        "field": "name",
                        "size": 10,
                        "order" : { "max_level" : "desc" }
                    },
                    "aggs" : {
                        "max_level" : {
                            "max" : {"field" : "level" }
                        }
                    }
                }
            },
            "size": 0
        }
    };

    data.search(query).then(function (response) {
        var data = response.aggregations.per_user.buckets.map(function(entry){
            return {
                name: entry.key,
                level: entry.max_level.value
            };
        });
        res.send(data);
    }, function (error) {
        var err = new Error(error);
        err.status = 404;
        next(err);
    });

});

module.exports = router;