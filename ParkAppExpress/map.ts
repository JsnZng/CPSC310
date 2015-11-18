/// <reference path="./DefinitelyTyped/googlemaps/google.maps.d.ts"/>
/// <reference path="./DefinitelyTyped/jquery/jquery.d.ts"/>

///<reference path='DefinitelyTyped/node/node.d.ts'/>
///<reference path='DefinitelyTyped/express/express.d.ts'/> 
///<reference path='DefinitelyTyped/mongodb/mongodb.d.ts' />

import mongodb = require('mongodb');

class Map {
	public name: string;
    private map: google.maps.Map;
    private options: any;
    private locationMarker: google.maps.Marker;

    constructor(mapDiv: Element) {
        this.name = "GoogleMap";
        this.options = {
            zoom: 10,
            MapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(49.2069, -122.9111)
        };
        this.map = new google.maps.Map(mapDiv, this.options);
    }

    addParkMarker(latLng: google.maps.LatLng) {
        //create marker to be added
        var markerOptions = {
            position: latLng,
            icon: "https://maps.google.com/mapfiles/kml/shapes/parks_maps.png",
            map: this.map //adds marker to map
        };
        var marker = new google.maps.Marker(markerOptions);
    }

    setInput(input: HTMLInputElement) {
        this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);
    }

    addLocationMarker(latlong: google.maps.LatLng) {

        if (this.locationMarker != null) {
            this.locationMarker.setMap(null);
            this.locationMarker.setVisible(false);
        }

        //create marker to be added
        var markerOptions = {
            position: latlong,
            icon: "https://maps.google.com/mapfiles/kml/shapes/horsebackriding.png",
            map: this.map //adds marker to map
        };
        this.locationMarker = new google.maps.Marker(markerOptions);
    }
}

window.onload = () => {
	var mapCanvas = document.getElementById("map");

    var googleMap = new Map(mapCanvas);

    //Add Search Box
    var elSearchBox = <HTMLInputElement>document.getElementById("search_box");

    //var searchBoxOptions = googleMap.getMapBounds();
    var searchBox = new google.maps.places.SearchBox(
        elSearchBox
        //searchBoxOptions
    );

    //attach SearchBox to Map
    googleMap.setInput(elSearchBox);

    searchBox.addListener(
        'places_changed',
        () => {
            var places = searchBox.getPlaces()

            if (places.length == 0)
                return;

            places.forEach((place) => {
                googleMap.addLocationMarker(place.geometry.location);
            });
        }
    );
};
