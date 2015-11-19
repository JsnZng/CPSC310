///<reference path='../DefinitelyTyped/node/node.d.ts'/>
///<reference path='../DefinitelyTyped/express/express.d.ts'/> 

import dl = require("../dataLoader");
import db = require("../db");

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/data', function(req, res, next) {
	db.getParks(function(parks) {
		console.log(parks);
		res.render('data', { "data": parks });
	});
});

router.get('/dataloader', function(req, res, next) {
	res.render('dataloader', { title: 'Data Loader' });
});

router.get('/map', function(req, res, next) {
	db.getParks(function(parks) {
		res.render('map', { 
			title: 'Vancouver Parks Map', 
			//"parks": parks.map(function(park) {
			//	var jsonString = '{ "lat" : ' + park.GoogleMapDest.split(",")[0] + ',"lng" : ' + park.GoogleMapDest.split(",")[1] +' }';
			//	return JSON.parse(jsonString);
			//})
			"parks": JSON.stringify(parks)
		});
	});
}); 

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'User Login' });
});

router.post('/userLogin', function (req, res, next) {

});

router.get('/userSignup', function(req, res, next) {
	res.redirect('/signup');
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'User Sign Up' });
})

router.post('/loaddata', function(req, res) {
	dl.getData(req.body.url);
});

module.exports = router;