var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Scripts/tsUnit/tsUnit'], function (require, exports, tsUnit) {
    var tests;
    (function (tests) {
        var MockTests = (function (_super) {
            __extends(MockTests, _super);
            function MockTests() {
                _super.apply(this, arguments);
            }
            MockTests.prototype.addOneAndTwo = function () {
                var result = (1 + 2);
                this.areIdentical(3, result);
            };
            return MockTests;
        })(tsUnit.TestClass);
        tests.MockTests = MockTests;
    })(tests || (tests = {}));
    var result = new tsUnit.Test(tests).run();
});
//# sourceMappingURL=tests.js.map