//model for a park with name, google coord(latlong) and facilities
//import * as google from ("./Scripts/maps/google.maps.d");
define(["require", "exports"], function (require, exports) {
    var park = (function () {
        /* Constructors */
        function park(name, latlong, hasFacilities) {
            this.name = name;
            this.latlong = latlong;
            this.hasFacilities = hasFacilities;
        }
        return park;
    })();
    exports.park = park;
});
//# sourceMappingURL=park.js.map