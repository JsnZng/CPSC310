/// <reference path="../../DefinitelyTyped/googlemaps/google.maps.d.ts"/>
///<reference path='../../DefinitelyTyped/node/node.d.ts'/>
///<reference path='../../DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../../DefinitelyTyped/mongodb/mongodb.d.ts' />

class Map {
	public name: string;
    private map: google.maps.Map;
    private options: any;
    private locationMarker: google.maps.Marker;

    constructor(mapDiv: Element) {
        this.name = "GoogleMap";
        this.options = {
            zoom: 12,
            MapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(49.2569, -123.1000)
        };
        this.map = new google.maps.Map(mapDiv, this.options);
    }

    addParkMarker(park) {
        //create marker to be added
        var latitude = parseFloat(park.GoogleMapDest.split(",")[0]);
        var longitude = parseFloat(park.GoogleMapDest.split(",")[1]);
        var latLng = new google.maps.LatLng(latitude, longitude);
        var markerOptions = {
            position: latLng,
            icon: "https://maps.google.com/mapfiles/kml/shapes/parks_maps.png",
            map: this.map //adds marker to map
        };
        var marker = new google.maps.Marker(markerOptions);
        var contentString = '<h2><a href="../park/' + park.ID + '">' + park.Name + '</a></h2>'
            + '<p>' + park.StreetNumber + '</p>'
            + '<p>' + park.StreetName + '</p>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function() {
            infowindow.open(this.map, marker);
        });
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
