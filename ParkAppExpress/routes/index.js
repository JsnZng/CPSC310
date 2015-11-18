///<reference path='../DefinitelyTyped/node/node.d.ts'/>
///<reference path='../DefinitelyTyped/express/express.d.ts'/> 
var dl = require("../dataLoader");
var db = require("../db");
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/data', function (req, res, next) {
    db.getParks(function (parks) {
        console.log(parks);
        res.render('data', { "data": parks });
    });
});
router.get('/dataloader', function (req, res, next) {
    res.render('dataloader', { title: 'Data Loader' });
});
router.get('/map', function (req, res, next) {
    res.render('map', { title: 'Vancouver Parks Map' });
});
router.post('/loaddata', function (req, res) {
    dl.getData(req.body.url);
});
module.exports = router;
