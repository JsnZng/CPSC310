///<reference path='../DefinitelyTyped/node/node.d.ts'/>
///<reference path='../DefinitelyTyped/express/express.d.ts'/> 
var dl = require("../dataLoader");
var db = require("../db");
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.redirect('/map');
});
router.get('/data', function (req, res, next) {
    if (req.session && req.session.user && req.session.user.IsAdmin) {
        db.getParks(function (parks) {
            //console.log(parks);
            //res.render('data', { "data": parks });
            res.json(parks);
        });
    }
    else {
        res.redirect('/login');
    }
});
router.get('/users', function (req, res, next) {
    if (req.session && req.session.user && req.session.user.IsAdmin) {
        db.getUsers(function (users) {
            res.json(users);
        });
    }
    else {
        res.redirect('/login');
    }
});
router.get('/dataloader', function (req, res, next) {
    if (req.session && req.session.user && req.session.user.IsAdmin) {
        res.render('dataloader', { title: 'Data Loader' });
    }
    else {
        res.redirect('/login');
    }
});
router.post('/dataloader', function (req, res) {
    dl.getData(req.body.url);
});
router.get('/map', function (req, res, next) {
    if (req.session && req.session.user) {
        db.getParks(function (parks) {
            res.render('map', {
                title: 'Vancouver Parks Map',
                "parks": JSON.stringify(parks),
                "user": req.session.user.Username
            });
        });
    }
    else {
        res.redirect('/login');
    }
});
router.get('/list', function (req, res, next) {
    if (req.session && req.session.user) {
        db.getParks(function (parks) {
            res.render('list', {
                title: 'Vancouver Parks List',
                "parks": parks,
                "user": req.session.user.Username
            });
        });
    }
    else {
        res.redirect('/login');
    }
});
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'User Login' });
});
router.post('/login', function (req, res, next) {
    db.getUser(req.body.username, function (user) {
        if (!user) {
            res.render('login', { title: 'User Login', 'message': 'Incorrect username/password combination' });
        }
        else {
            if (req.body.password != user.Password) {
                res.render('login', { title: 'User Login', 'message': 'Incorrect Username/Password Combination' });
            }
            else {
                req.session.user = user;
                res.redirect('/map');
            }
        }
    });
});
router.get('/signup', function (req, res, next) {
    res.render('signup', { title: 'User Sign Up' });
});
router.post('/signup', function (req, res, next) {
    db.getUser(req.body.username, function (user) {
        if (!user) {
            db.addUser(req.body.username, req.body.password, function () {
                res.redirect('/login');
            });
        }
        else {
            res.render('signup', { title: 'User Sign Up', "message": 'Username Already Exists' });
        }
    });
});
router.get('/profile', function (req, res, next) {
    res.render('profile', { "user": req.session.user });
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});
module.exports = router;
