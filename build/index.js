"use strict";
const display_1 = require("./view/display");
const textModel_1 = require("./model/textModel");
let content = "# title \n" +
    "\n" +
    "content\n" +
    "something else\n";
let elem = document.getElementById("frame");
let display = new display_1.Display(elem);
let textModel = new textModel_1.TextModel();
textModel.setFromRawText(content);
display.render(textModel);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXNCLGdCQUN0QixDQUFDLENBRHFDO0FBQ3RDLDRCQUF3QixtQkFFeEIsQ0FBQyxDQUYwQztBQUUzQyxJQUFJLE9BQU8sR0FDWCxZQUFZO0lBQ1osSUFBSTtJQUNKLFdBQVc7SUFDWCxrQkFBa0IsQ0FBQTtBQUVsQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztBQUVoQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
