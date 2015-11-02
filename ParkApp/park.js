//model for a park with name, google coord(latlong) and facilities
/// <reference path="./Scripts/maps/google.maps.d.ts"/>
var park;
(function (park) {
    var Park = (function () {
        /* Constructors */
        function Park(name, lat, long, hasFacilities) {
            this.name = name;
            this.lat = lat;
            this.long = long;
            this.hasFacilities = hasFacilities;
        }
        /* Helpers */
        Park.prototype.toString = function () {
            return this.name + " " + this.lat.toString() + " " + this.long.toString() + " " + String(this.hasFacilities);
        };
        return Park;
    })();
    park.Park = Park;
})(park || (park = {}));
//# sourceMappingURL=park.js.map