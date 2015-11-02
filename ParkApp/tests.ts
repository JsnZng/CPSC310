import tsUnit = require('./Scripts/tsUnit/tsUnit');
module tests {
    export class MockTests extends tsUnit.TestClass {


        addOneAndTwo() {

            var result = (1 + 2);

            this.areIdentical(3, result);
        }
    }
}

var result = new tsUnit.Test(tests).run();