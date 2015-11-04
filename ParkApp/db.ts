/// <reference path ="./Scripts/mongodb/mongodb.d.ts"/>


import mongodb = require('mongodb');


var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true})
var db = new mongodb.Db('parkcollection', server, { w: 1 });
db.open(function() {});

export function addParks(data) {
	db.collection('parkcollection', function(err, parkcollection) {
		if (err) {console.error(err); return;}
		parkcollection.insert(data, function(err, doc) {
			if (err) {console.error(err); return;}
			console.log('parks_stored'); 
		})
	})
}

export function getParks() {

}
