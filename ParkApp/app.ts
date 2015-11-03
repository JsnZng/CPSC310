/// <reference path="./park.ts"/>
/// <reference path="./Scripts/maps/google.maps.d.ts"/>

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

    addParkMarker(park: park.Park) {
        //create marker to be added
        var markerOptions = {
            position: new google.maps.LatLng(park.lat, park.long),
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

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    
    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    /* Map */


    //Display Map
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