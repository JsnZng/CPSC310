///<reference path='DefinitelyTyped/node/node.d.ts'/>
///<reference path='DefinitelyTyped/express/express.d.ts'/> 
///<reference path='DefinitelyTyped/mongodb/mongodb.d.ts' />

import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true })
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function() { });

export interface Park {
	
}

export interface User {

}

export function addUser(username, password) {
	db.collection('users_test', function(err, users_collection) {
		users_collection.insert({
			Username: username,
			Password: password,
			VisitedParks: {}
		}, function(err, x) {
			if (err) { console.error(err); return;}
			console.log(x);
		})
	})
}

export function getUser() {

}

export function addParks(parks) {
	db.collection('parks_test2', function(err, parks_collection) {
		if(err) {console.error(err); return;}
		parks_collection.insert(parks, function(err, x) {
			if(err) {console.error(err); return;}
			console.log(x);
		});
	});
}

export function getParks(callback) {
	db.collection('parks_test2', function(err, parks_collection) {
		if(err) {console.error(err); return;}
		parks_collection.find({}, {}).toArray(function(err, parks) {
			if(err) {console.error(err); return;}
			callback(parks);
		});
	})
}
