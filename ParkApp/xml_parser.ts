/// <reference path="./Scripts/xml2json/xml2json.ts"/>
/// <reference path ="./Scripts/ftp/ftp.d.ts"/>
/// <reference path ="./db.ts"/>


import ftp = require('ftp');
import db = require('db');

module xml_parser {
	export class xmlParser {

		store(data) {
			db.addParks()
		}

		parse(data) {
			var jsonData = xml2json.XMLParser.parse(data);
			var ret = ret.COVParksFacilities;
			return ret;
		}

		public static get() {
			var c = new ftp();
			var hostName = 'webftp.vancouver.ca';
			var path =  '/opendata/xml/parks_facilities.xml;';
			var options = {host : hostName};
			var data;
			c.on('ready', function() {
				c.get(path, function(err, stream) {
					if (err) throw err;
					stream.on('data',function(d) {
						data += d.toString;
					});
					stream.on('end', function() {
						//parse and store the data we just got
						var parsedData = this.parse(data);
						this.store(data);
					})
				});
			});
			c.connect(options);

		}

	}
}

