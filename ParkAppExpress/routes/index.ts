///<reference path='../DefinitelyTyped/node/node.d.ts'/>
///<reference path='../DefinitelyTyped/express/express.d.ts'/> 

import dl = require("../dataLoader");
import db = require("../db");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/map');
});

router.get('/data', function(req, res, next) {
	if (req.session && req.session.user && req.session.user.IsAdmin) {
		db.getParks(function(parks) {
			//console.log(parks);
			//res.render('data', { "data": parks });
			res.json(parks);
		});
	} else { 
		res.redirect('/login');
	}
});

router.get('/users', function(req, res, next) {
	if (req.session && req.session.user && req.session.user.IsAdmin) {
		db.getUsers(function(users) {
			res.json(users);
		});
	} else {
		res.redirect('/login');
	}
})

router.get('/dataloader', function(req, res, next) {
	if (req.session && req.session.user && req.session.user.IsAdmin) {
		res.render('dataloader', { title: 'Data Loader' });
	} else {
		res.redirect('/login');
	}
});

router.post('/dataloader', function(req, res) {
	dl.getData(req.body.url);
});

router.get('/parsertest', function(req, res, next) {
	if (req.session && req.session.user && req.session.user.IsAdmin) {
		var test = "<COVParksFacilities>" 
			+ "<Park ID='1'><Name>Arbutus Village Park</Name><StreetNumber>4202</StreetNumber><StreetName>Valley Drive</StreetName><GoogleMapDest>49.249783,-123.155250</GoogleMapDest></Park>"
			+ "<Park ID='2'><Name>Carnarvon Park</Name><StreetNumber>2995</StreetNumber><StreetName>W 19th Avenue</StreetName><GoogleMapDest>49.256555,-123.171406</GoogleMapDest></Park>" 
			+ "</COVParksFacilities>";
		var expectedResult = [{"ID": "1", "Name": "Arbutus Village Park", "StreetNumber": "4202", "StreetName": "Valley Drive", "GoogleMapDest": "49.249783,-123.155250"}, 
			{"ID": "2", "Name": "Carnarvon Park", "StreetNumber": "2995", "StreetName": "W 19th Avenue", "GoogleMapDest": "49.256555,-123.171406" }];
		res.render('parsertest', { 
			title: 'Parser Test',
			"test": test,
			"expectedResult": JSON.stringify(expectedResult)
		});
	} else {
		res.redirect('/login');
	}
});

router.post('/parsertest', function(req, res, next) {
	if (req.session && req.session.user && req.session.user.IsAdmin) {
		var test = "<COVParksFacilities>"
			+ "<Park ID='1'><Name>Arbutus Village Park</Name><StreetNumber>4202</StreetNumber><StreetName>Valley Drive</StreetName><GoogleMapDest>49.249783,-123.155250</GoogleMapDest></Park>"
			+ "<Park ID='2'><Name>Carnarvon Park</Name><StreetNumber>2995</StreetNumber><StreetName>W 19th Avenue</StreetName><GoogleMapDest>49.256555,-123.171406</GoogleMapDest></Park>"
			+ "</COVParksFacilities>";
		var expectedResult = [{ "ID": "1", "Name": "Arbutus Village Park", "StreetNumber": "4202", "StreetName": "Valley Drive", "GoogleMapDest": "49.249783,-123.155250" },
			{ "ID": "2", "Name": "Carnarvon Park", "StreetNumber": "2995", "StreetName": "W 19th Avenue", "GoogleMapDest": "49.256555,-123.171406" }];
		var result = dl.parseData(test);
		res.render('parsertest', {
			title: 'Parser Test',
			"test": test,
			"expectedResult": JSON.stringify(expectedResult),
			"result": JSON.stringify(result),
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/map', function(req, res, next) {
	if (req.session && req.session.user){
		db.getParks(function(parks) {
			res.render('map', {
				title: 'Vancouver Parks Map',
				"parks": JSON.stringify(parks),
				"user": req.session.user.Username
			});
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/list', function(req, res, next) {
	if (req.session && req.session.user) {
		db.getParks(function(parks) {
			res.render('list', {
				title: 'Vancouver Parks List',
				"parks": parks,
				"user" : req.session.user.Username
			});
		});
	} else {
		res.redirect('/login');
	}
});

router.post('/list', function(req, res, next) {
	if (req.session && req.session.user) {
		var filter = req.body.filter;
		db.getParks(function(parks) {
			///////////////////////////////////// Filter /////////////////////////////////////
			var filteredParks = [];
			for (var i = 0; i < parks.length; i++) {
				var park = parks[i];
				if (filter == "") {
					filteredParks = parks;
				} else {
					if (filter.toUpperCase() == "washroom".toUpperCase()) {
						if (park.Facilities.Washroom.Location) {
							filteredParks[filteredParks.length] = park;
						}
					} else {
						if (park.Facilities.Facility) {
							for (var j = 0; j < park.Facilities.Facility.length; j++) {
								var type = park.Facilities.Facility[j].FacilityType.toUpperCase();
								if (type.indexOf(filter.toUpperCase()) != -1) {
									filteredParks[filteredParks.length] = park;
									break;
								}
							}
						}

					}
				}
				
			}
			/////////////////////////////////////////////////////////////////////////////////////
			res.render('list', {
				title: 'Vancouver Parks List',
				"parks": filteredParks,
				"user": req.session.user.Username
			});
		});
	} else {
		res.redirect('/login');
	}
})

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'User Login'});
});

router.post('/login', function(req, res, next) {
	db.getUser(req.body.username, function(user) {
		if (!user) {
			res.render('login', { title: 'User Login', 'message': 'Incorrect username/password combination' });
		} else {
			if (req.body.password != user.Password) {
				res.render('login', { title: 'User Login', 'message': 'Incorrect Username/Password Combination' });
			} else {
				req.session.user = user;
				res.redirect('/map');
			}
		}
	})
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'User Sign Up' });
});

router.post('/signup', function(req, res, next) {
	db.getUser(req.body.username, function(user) {
		if (!user) {
			db.addUser(req.body.username, req.body.password, function() {
				res.redirect('/login');
			});
		} else {
			res.render('signup', { title: 'User Sign Up', "message": 'Username Already Exists' });
		}
	})
});

router.get('/profile', function(req, res, next) {
	res.render('profile', {"user" : req.session.user});
});

router.get('/logout', function(req, res, next) {
	req.session.destroy();	
	res.redirect('/login');
});

router.get('/park/:id', function (req, res, next) {
    if (req.session && req.session.user) {
        db.getPark(req.param.id, function (park) {
            console.error("could not find park");
            res.render('park', {
                'park': park
            });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
