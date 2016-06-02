var data = require('../bin/data');
var debug = require('debug')('miby-server:server');

    var query = {
        "index": 'miby',
        "type": 'level',
        "body": {
            "size": 9999,
            "query": {
                "match_all": {}
            },
            "fielddata_fields": ["date"]
        }
    };

    data.search(query).then(function (response) {

	var rdata = response.hits.hits.map(function(entry) {
	    return {
		session: entry._source.session,
                name: entry._source.name,
		level: entry._source.level,
                date: entry.fields.date[0],
                start: entry._source.start,
		moves: entry._source.moves
	    }
	});


	console.log(JSON.stringify(rdata));

    }, function (error) {
        var err = new Error(error);
        err.status = 404;
        next(err);
    });

