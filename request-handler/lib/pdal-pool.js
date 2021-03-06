// pdal-pool.js
// A pool of PDALSession processes
//

var 
	_ = require('lodash'),
	PDALSession = require('./pdal-session').PDALSession,
	poolModule = require('generic-pool');

(function() {
	"use strict";

	var createProcessPool = function(pdalOptions) {
		var pool = poolModule.Pool({
			name: 'pdal-pool',
			create: function(cb) {
				var s = new PDALSession(_.defaults(pdalOptions || {}, {
					processPath: path.join(__dirname, '..', 'pdal-session', 'pdal-session'),
					log: true
				}));

				cb(s);
			},

			destroy: function(s) {
				s.kill();
			},

			max: 100,
			min: 5,
			idleTimeoutMillis: 10000,
			log: false
		});

		return pool;
	}

	module.exports.createProcessPool = createProcessPool;
})();
