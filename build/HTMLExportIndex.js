"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CodeMirror = require("codemirror");
require("codemirror/mode/htmlmixed/htmlmixed");
const util_1 = require("./util");
const electron_1 = require("electron");
const fs = require("fs");
const js_beautify_1 = require("js-beautify");
util_1.i18n.InitializeI18n();
document.title = util_1.i18n.getString("exportHTML.title");
let htmlHead = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
  </head>
  <body>
`;
let headTail = `
  </body>
</html>
`;
let rawTextarea = document.getElementById("htmlEditor");
let saveButton = document.getElementById("saveButton");
let myModeSpec = {
    name: "htmlmixed",
    scriptTypes: [{ matches: /\/x-handlebars-template|\/x-mustache/i,
            mode: null },
        { matches: /(text|application)\/(x-)?vb(a|script)/i,
            mode: "vbscript" }]
};
let codeMirror = CodeMirror.fromTextArea(rawTextarea, {
    mode: myModeSpec
});
function GetData() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield util_1.Host.getExportHTML();
        data = htmlHead + data + headTail;
        codeMirror.setValue(js_beautify_1.html(data));
    });
}
GetData();
saveButton.setAttribute("title", util_1.i18n.getString("exportHTML.save"));
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    electron_1.remote.dialog.showSaveDialog({
        filters: [
            { name: "HTML", extensions: ["html", "htm"] }
        ]
    }, (filePath) => {
        if (filePath) {
            let data = codeMirror.getValue();
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.error(err);
                }
                else {
                    alert("Save success");
                }
            });
        }
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVE1MRXhwb3J0SW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUN4QyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQTtBQUM5QyxpQ0FBc0M7QUFDdEMsdUNBQStCO0FBQy9CLHlCQUF3QjtBQUN4Qiw2Q0FBaUQ7QUFFakQsV0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRW5CLFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWpELElBQUksUUFBUSxHQUFHOzs7Ozs7OztDQVFkLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRzs7O0NBR2QsQ0FBQTtBQUVELElBQUksV0FBVyxHQUF3QixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdFLElBQUksVUFBVSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXBFLElBQUksVUFBVSxHQUFHO0lBQ2IsSUFBSSxFQUFFLFdBQVc7SUFDakIsV0FBVyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsdUNBQXVDO1lBQy9DLElBQUksRUFBRSxJQUFJLEVBQUM7UUFDWCxFQUFDLE9BQU8sRUFBRSx3Q0FBd0M7WUFDbEQsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDO0NBQ3JDLENBQUM7QUFFRixJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtJQUNsRCxJQUFJLEVBQUUsVUFBVTtDQUNuQixDQUFDLENBQUM7QUFFSDs7UUFFSSxJQUFJLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUM7UUFDbEMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFN0MsQ0FBQztDQUFBO0FBRUQsT0FBTyxFQUFFLENBQUM7QUFFVixVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUNqRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtJQUMvQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFbkIsaUJBQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3pCLE9BQU8sRUFBRTtZQUNMLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUM7U0FDOUM7S0FDSixFQUFFLENBQUMsUUFBZ0I7UUFDaEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVqQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUEwQjtnQkFDcEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoiSFRNTEV4cG9ydEluZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
