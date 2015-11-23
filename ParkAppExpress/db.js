///<reference path='DefinitelyTyped/node/node.d.ts'/>
///<reference path='DefinitelyTyped/express/express.d.ts'/> 
///<reference path='DefinitelyTyped/mongodb/mongodb.d.ts' />
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
var db = new mongodb.Db('mydb', server, { w: 1 });
db.open(function () { });
function getUsers(callback) {
    db.collection('users_test', function (err, users_collection) {
        if (err) {
            console.error(err);
            return;
        }
        users_collection.find({}, {}).toArray(function (err, users) {
            if (err) {
                console.error(err);
                return;
            }
            callback(users);
        });
    });
}
exports.getUsers = getUsers;
function addUser(username, password, callback) {
    db.collection('users_test', function (err, users_collection) {
        users_collection.insert({
            'Username': username,
            'Password': password,
            'IsAdmin': false,
            'VisitedParks': {}
        }, function (err, x) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(x);
            callback();
        });
    });
}
exports.addUser = addUser;
function getUser(username, callback) {
    db.collection('users_test', function (err, users_collection) {
        if (err) {
            console.error(err);
            return;
        }
        users_collection.findOne({ 'Username': username }, function (err, user) {
            if (err) {
                console.error(err);
                return;
            }
            callback(user);
        });
    });
}
exports.getUser = getUser;
function addParks(parks) {
    db.collection('parks_test3', function (err, parks_collection) {
        if (err) {
            console.error(err);
            return;
        }
        for (var i = 0; i < parks.length; i++) {
            parks[i].Comments = {};
            parks[i].Ratings = {};
        }
        parks_collection.insert(parks, function (err, x) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(x);
            console.log('Parks Successfully Added');
        });
    });
}
exports.addParks = addParks;
function getParks(callback) {
    db.collection('parks_test3', function (err, parks_collection) {
        if (err) {
            console.error(err);
            return;
        }
        parks_collection.find({}, {}).toArray(function (err, parks) {
            if (err) {
                console.error(err);
                return;
            }
            callback(parks);
        });
    });
}
exports.getParks = getParks;
