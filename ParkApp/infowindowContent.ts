/// <reference path="./park.ts"/>

class infowindowContent {
	private name: string;
	private website: string;
	private facilities: boolean; 
	private rating: number; // rating class to be implemented
	private comments: string; // comment class needed to be implemented
	
	infowindowContent(park: park.Park){
		var contentString; 
		this.name = park.name; 
		this.facilities = park.hasFacilities;
		contentString = "format the content " //todo!
		return contentString; 
	}
	

}
