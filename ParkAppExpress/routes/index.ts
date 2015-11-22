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
		//console.log(parks);
		//res.render('data', { "data": parks });
		res.json(parks);
	});
});

router.get('/users', function(req, res, next) {
	db.getUsers(function(users) {
		res.json(users);
	})
})

router.get('/dataloader', function(req, res, next) {
	res.render('dataloader', { title: 'Data Loader' });
});

router.post('/dataloader', function(req, res) {
	dl.getData(req.body.url);
});

router.get('/map', function(req, res, next) {
	if (req.session && req.session.user){
		db.getParks(function(parks) {
			res.render('map', {
				title: 'Vancouver Parks Map',
				"parks": JSON.stringify(parks)
			});
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'User Login' });
});

router.post('/login', function(req, res, next) {
	db.getUser(req.body.username, function(user) {
		if (!user) {
			res.redirect('/login');
		} else {
			if (req.body.password != user.Password) {
				res.redirect('/login');
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
	db.addUser(req.body.username, req.body.password, function() {
		res.redirect('/login');
	});
});

module.exports = router;
