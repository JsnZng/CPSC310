///<reference path='DefinitelyTyped/node/node.d.ts'/>
///<reference path='DefinitelyTyped/express/express.d.ts'/> 

import db = require("./db")

export function getData(url) {
	var JSFtp = require('jsftp');
	var URL = require('url');
	var data = '';
	var Ftp = new JSFtp({
		host: URL.parse(url).hostname,
	});
	Ftp.get(URL.parse(url).pathname, function(err, socket) {
		if (err) return;

		socket.on('data', function(d) {
			data += d.toString();
			console.log(data);
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

function parseData(data) {
	var parser = require('xml2json');
	var jsonData = parser.toJson(data);
	console.log('data_parsed');
	var result = JSON.parse(jsonData).COVParksFacilities.Park;
	//console.log(result);
	return result;
}

function storeData(parsedData) {
	db.addParks(parsedData);
}