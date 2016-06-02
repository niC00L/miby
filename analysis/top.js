var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

    var query = {
        "index": 'miby',
        "type": 'level',
        "body": {
            "aggs": {
                "per_user": {
                    "terms": {
                        "field": "name",
                        "order" : { "max_level" : "desc" },
                        "size": 9999
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
        var rdata = response.aggregations.per_user.buckets.map(function(entry){
            return {
                name: entry.key,
                level: entry.max_level.value
            };
        });

	console.log(JSON.stringify(rdata));

    }, function (error) {
        var err = new Error(error);
        err.status = 404;
        next(err);
    });

