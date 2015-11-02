//model for a park with name, google coord(latlong) and facilities
//import * as google from ("./Scripts/maps/google.maps.d");

export class park {

    /* Fields */

    name: string; // name of the park
    latlong: google.maps.LatLng; //latlong location of park
    hasFacilities: boolean;


    /* Constructors */
    constructor(name: string, latlong: google.maps.LatLng, hasFacilities: boolean) {
        this.name = name;
        this.latlong = latlong;
        this.hasFacilities = hasFacilities;
    }

}