import {RopeString} from "./model/TextModel"


var str = new RopeString("hello");
console.log(str.reportAll());

str.insert(2, "FUCK")
console.log(str.reportAll());

str.insert(3, "fuck");
console.log(str.reportAll());

str.delete(1, 2);
console.log(str.reportAll());
