/// <reference path="./Scripts/xml2json/xml2json.ts"/>

module xml_parser {
	export class xmlParser {

		parse(data) {
			var jsonData = xml2json.XMLParser.parse(data);
			var ret = ret.COVParksFacilities;
			return ret;
		}
	}
}

