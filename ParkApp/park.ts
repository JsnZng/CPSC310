//model for a park with name, google coord(latlong) and facilities
/// <reference path="./Scripts/maps/google.maps.d.ts"/>
module park {
    export class Park {

        /* Fields */

        private _name: string; // name of the park
        private _long: number //latlong location of park
        private _lat: number;
        private _hasFacilities: boolean; //does the park have facilities?



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
                
        get name(): string{
            return this._name;
        }
        
        get long(): number{
            return this._long;
        }
        
        get lat(): number{
            return this._lat;
        }
        
        get hasFacilities(): boolean{
            return this._hasFacilities;
        }
        

    }
}
