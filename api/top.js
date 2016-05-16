var express = require('express');
var router = express.Router();
var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

router.get('/', function(req, res, next) {

    var level = req.param('level');
    
    if(!level) {
        var err = new Error("Missing arguments (level is required)");
        err.status = 400;
        next(err);
        return;
    }

    console.log("level", level);

    var query = {
        "index": 'miby',
        "type": 'level',
        "body": {
            "query": {
                "filtered": {
                    "filter": {
                        "exists": {
                            "field": "name"
                        }
                    },
                    "query": {
                        "bool": {
                            "must": [
                            {
                                "term": { "level" : level },
                            }
                            ]
                        }
                    }
                }
            },
            "size": 10,
            "sort": [
            {
                "time": {
                    "order": "asc",
                    "mode": "min"
                }
            }
            ],
            "aggs": {
                "per_user": {
                    "terms": {
                        "field": "name"
                    }
                }
            },
            "_source" : ["name", "time"]
        }
    };

    var seed = req.param('seed');
    if(seed) {
        query.body.query.filtered.query.bool.must.push({
            "term": { "seed" : seed },
        });
    }

    var generator = req.param('generator');
    if(generator) {
        query.body.query.filtered.query.bool.must.push({
            "term": { "generator" : generator },
        });
    }

    data.search(query).then(function (response) {
        var data = response.hits.hits.map(function(entry){
            return entry._source;
        });
        res.send(data);
    }, function (error) {
        var err = new Error(error);
        err.status = 404;
        next(err);
    });

});

module.exports = router;