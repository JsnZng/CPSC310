//model for a park with name, google coord(latlong) and facilities
/// <reference path="./Scripts/maps/google.maps.d.ts"/>
module park {
    export class Park {

        /* Fields */

        name: string; // name of the park
        long: number //latlong location of park
        lat: number;
        hasFacilities: boolean; //does the park have facilities?


        /* Constructors */
        constructor(name: string, lat : number, long: number, hasFacilities: boolean) {
            this.name = name;
            this.lat = lat;
            this.long = long;
            this.hasFacilities = hasFacilities;
        }

        /* Helpers */

        toString() {
            return this.name + " " + this.lat.toString() + " " + this.long.toString() + " " + String(this.hasFacilities);
        }

    }
}