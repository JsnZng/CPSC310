/// <reference path="./park.ts"/>
/// <reference path="./Scripts/maps/google.maps.d.ts"/>
var Map = (function () {
    function Map(mapDiv) {
        this.name = "GoogleMap";
        this.options = {
            zoom: 10,
            MapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(49.2069, -122.9111)
        };
        this.map = new google.maps.Map(mapDiv, this.options);
    }
    Map.prototype.addParkMarker = function (park) {
        //create marker to be added
        var markerOptions = {
            position: new google.maps.LatLng(park.lat, park.long),
            icon: "https://maps.google.com/mapfiles/kml/shapes/parks_maps.png",
            map: this.map //adds marker to map
        };
        var marker = new google.maps.Marker(markerOptions);
    };
    Map.prototype.setInput = function (input) {
        this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);
    };
    Map.prototype.addLocationMarker = function (latlong) {
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
    };
    return Map;
})();
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    /* Map */
    //Display Map
    var mapCanvas = document.getElementById("map");
    var googleMap = new Map(mapCanvas);
    //Add Search Box
    var elSearchBox = document.getElementById("search_box");
    //var searchBoxOptions = googleMap.getMapBounds();
    var searchBox = new google.maps.places.SearchBox(elSearchBox);
    //attach SearchBox to Map
    googleMap.setInput(elSearchBox);
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();
        if (places.length == 0)
            return;
        places.forEach(function (place) {
            googleMap.addLocationMarker(place.geometry.location);
        });
    });
};
//# sourceMappingURL=app.js.map