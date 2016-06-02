var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

    var query = {
        "index": 'miby',
        "type": 'level',
        "body": {
            "aggs": {
                "per_level": {
                    "terms": {
                        "field": "level",
                        "size": 9999
                    },
                    "aggs" : {
                        "time" : {
                            "sum" : {"field" : "time" }
                        }
                    }
                }
            },
            "size": 0
        }
    };

    data.search(query).then(function (response) {
        var rdata = response.aggregations.per_level.buckets.map(function(entry){
            return {
                level: entry.key,
                time: entry.time.value
            };
        });

	console.log(JSON.stringify(rdata));

    }, function (error) {
        var err = new Error(error);
        err.status = 404;
        next(err);
    });

