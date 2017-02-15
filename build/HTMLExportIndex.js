"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVE1MRXhwb3J0SW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQzlDLGlDQUFzQztBQUN0Qyx1Q0FBK0I7QUFDL0IseUJBQXdCO0FBQ3hCLDZDQUFpRDtBQUVqRCxXQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFbkIsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFakQsSUFBSSxRQUFRLEdBQUc7Ozs7Ozs7O0NBUWQsQ0FBQTtBQUVELElBQUksUUFBUSxHQUFHOzs7Q0FHZCxDQUFBO0FBRUQsSUFBSSxXQUFXLEdBQXdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0UsSUFBSSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEUsSUFBSSxVQUFVLEdBQUc7SUFDYixJQUFJLEVBQUUsV0FBVztJQUNqQixXQUFXLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSx1Q0FBdUM7WUFDL0MsSUFBSSxFQUFFLElBQUksRUFBQztRQUNYLEVBQUMsT0FBTyxFQUFFLHdDQUF3QztZQUNsRCxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7Q0FDckMsQ0FBQztBQUVGLElBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO0lBQ2xELElBQUksRUFBRSxVQUFVO0NBQ25CLENBQUMsQ0FBQztBQUVIOztRQUVJLElBQUksSUFBSSxHQUFHLE1BQU0sV0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNsQyxVQUFVLENBQUMsUUFBUSxDQUFDLGtCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU3QyxDQUFDO0NBQUE7QUFFRCxPQUFPLEVBQUUsQ0FBQztBQUVWLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFhO0lBQy9DLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUVuQixpQkFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDekIsT0FBTyxFQUFFO1lBQ0wsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQztTQUM5QztLQUNKLEVBQUUsQ0FBQyxRQUFnQjtRQUNoQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEdBQTBCO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJIVE1MRXhwb3J0SW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
