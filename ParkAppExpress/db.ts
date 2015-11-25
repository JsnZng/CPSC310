///<reference path='DefinitelyTyped/node/node.d.ts'/>
///<reference path='DefinitelyTyped/express/express.d.ts'/> 
///<reference path='DefinitelyTyped/mongodb/mongodb.d.ts' />

import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true })
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function() { });

export function getUsers(callback) {
	db.collection('users_test2', function(err, users_collection) {
		if (err) { console.error(err); return; }
		users_collection.find({}, {}).toArray(function(err, users) {
			if (err) { console.error(err); return; }
			callback(users);
		});
	});
}

export function addUser(username, password, callback) {
	db.collection('users_test2', function(err, users_collection) {
		users_collection.insert({
			'Username': username,
			'Password': password,
			'IsAdmin': false,
			'VisitedParks': [],
			'RatedParks': []
		}, function(err, x) {
			if (err) { console.error(err); return; }
			console.log(x);
			callback();
		});
	});
}

export function getUser(username, callback) {
	db.collection('users_test2', function(err, users_collection) {
		if (err) { console.error(err); return }
		users_collection.findOne({ 'Username': username }, function(err, user) {
			if (err) { console.error(err); return; }
			callback(user);
		});
	});
}


export function addParks(parks) {
	db.collection('parks_test4', function(err, parks_collection) {
		if(err) {console.error(err); return;}
		for (var i = 0; i < parks.length; i++) {
			parks[i].Comments = [];
			parks[i].Ratings = [];
		}
		parks_collection.insert(parks, function(err, x) {
			if(err) {console.error(err); return;}
			console.log(x);
			console.log('Parks Successfully Added');
		});
	});
}

export function getParks(callback) {
	db.collection('parks_test4', function(err, parks_collection) {
		if(err) {console.error(err); return;}
		parks_collection.find({}, {}).toArray(function(err, parks) {
			if(err) {console.error(err); return;}
			callback(parks);
		});
	})
}

export function getPark(id, callback){
	db.collection('parks_test4', function(err, parks_collection) {
		if (err) { console.error(err); return;}
		parks_collection.findOne({ 'ID': id }, function(err, park) {
			if (err) { console.error(err); return; }
			callback(park);
		});
	});
}

export function addComment(username, parkid, comment) {
	console.log('Fired addComment()');
	db.collection('parks_test4', function(err, parks_collection) {
		if (err) { console.error(err); return; }
		parks_collection.update({ 'ID': parkid }, {
			$push : {
				Comments: {
					CommentString : comment,
					By : username
				}
			}
		});
		parks_collection.findOne({ 'ID': parkid }, function(err, park) {
			console.log(park);
		})
	});
}

export function MarkAsVisited(username, parkname, parkid) {
	console.log('Fired MarkAsVisited()');
	db.collection('users_test2', function(err, users_collection) {
		if (err) { console.error(err); return }
		users_collection.update({'Username' : username}, {
			$push : {
				VisitedParks: { ParkName : parkname, ID : parkid }
			}
		});
	});
}
