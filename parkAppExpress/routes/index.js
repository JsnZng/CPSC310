var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dataloader', function(req, res, next) {
	res.render('dataloader', { title: 'Data Loader'})
})

router.get('/map', function(req, res, next) {
	//res.sendFile(path.join(__dirname + '/google-maps.html'));
	//res.render('map', { title: 'Vancouver Parks' });
	var db = req.db;
	var collection = db.get('test2');
	var markerlist = "";
	collection.find({}, {}, function(e, docs) {
		var len = docs.length;
		for (i = 0; i < len/3; i++) {
			//console.log(docs[i].GoogleMapDest);
			markerlist = markerlist.concat("|");
			markerlist = markerlist.concat(docs[i].GoogleMapDest);
		}
		res.render('map', {markers : markerlist});
	})
	//console.log(markerlist);
})

router.get('/data', function(req, res, next) {
	var db = req.db;
	var collection = db.get('test2');
	collection.find({}, {}, function(e, docs) {
		res.render('data', {
			"data" : docs
		})
	})
});

router.post('/loaddata', function(req, res) {

	getData();
	res.redirect('/');

	function storeData(parsedData) {
		var db = req.db;
		var parkList = db.get('test2');
		// try with a test first
		parkList.insert(parsedData, function (err, doc) {
			if (err) {
				console.error(err);
			} else {
				console.log('data_stored');
			}
		});
	}

	function parseData(data) {
		var parser = require('xml2json');
		var jsonData = parser.toJson(data);
		console.log('data_parsed');
		var result = JSON.parse(jsonData).COVParksFacilities.Park;
		console.log(result);
		return result;
	}

	function getData() {
		var url = req.body.url;
		var JSFtp = require('jsftp');
		var URL = require('url');
		var data = '';
		var Ftp = new JSFtp({
			host: URL.parse(url).hostname,
		});
		Ftp.get(URL.parse(url).pathname, function(err,socket) {
			if (err) return;

			socket.on('data', function(d) { 
				data += d.toString();
				//console.log(data);
			});
			socket.on('close', function(hadErr) {
				if (hadErr)
					console.error('There was an error retrieving the file');
				var parsedData = parseData(data);
				storeData(parsedData);
			});
			socket.resume();
		});
	}


});

module.exports = router;
