"use strict";
const display_1 = require("./view/display");
const textModel_1 = require("./model/textModel");
let content = "# title \n" +
    "\n" +
    "content\n" +
    "something else\n";
let elem = document.getElementById("frame");
let textModel = new textModel_1.TextModel();
textModel.setFromRawText(content);
display_1.Display(textModel);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXNCLGdCQUN0QixDQUFDLENBRHFDO0FBQ3RDLDRCQUF3QixtQkFFeEIsQ0FBQyxDQUYwQztBQUUzQyxJQUFJLE9BQU8sR0FDWCxZQUFZO0lBQ1osSUFBSTtJQUNKLFdBQVc7SUFDWCxrQkFBa0IsQ0FBQTtBQUVsQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTVDLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO0FBRWhDLFNBQVMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEMsaUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
