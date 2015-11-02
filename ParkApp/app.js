/// <reference path="./park.ts"/>
/// <reference path="./Scripts/maps/google.maps.d.ts"/>
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
    /* Mock Application */
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    /* Park Instantiation Test*/
    var el2 = document.getElementById('park_tests');
    //instance of park
    var park01 = new park.Park("Unknown Park", 11.0, 12.0, true);
    el2.innerHTML = park01.toString();
    /* */
};
//# sourceMappingURL=app.js.map