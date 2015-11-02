/* Testing Module for Parks*/
/// <reference path="../park.ts"/>
/// <reference path="../Scripts/tsUnit/tsUnit.ts"/>
module park_test {

    export class ParkTests extends tsUnit.TestClass {
    
        //Instantiate Tests
        testInstance() {

            var park01 = new park.Park(
                "Unknown Park",
                12.0,
                11.0,
                true
            );

            //Test name
            this.areIdentical("Unknown Park", park01.name);

            //Test latlong
            //var latLong01 = new google.maps.LatLng(111.0, 1111.0, false);
            //this.areIdentical(latLong01, park01.latlong);

            //Test facilities
            this.areIdentical(true, park01.hasFacilities);
        }
    }
}