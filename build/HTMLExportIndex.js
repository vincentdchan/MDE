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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IVE1MRXhwb3J0SW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQzlDLGlDQUFzQztBQUN0Qyx1Q0FBK0I7QUFDL0IseUJBQXdCO0FBQ3hCLDZDQUFpRDtBQUVqRCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQUMsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUVqRCxJQUFJLFFBQVEsR0FBRzs7Ozs7Ozs7Q0FRZCxDQUFBO0FBRUQsSUFBSSxRQUFRLEdBQUc7OztDQUdkLENBQUE7QUFFRCxJQUFJLFdBQVcsR0FBd0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM3RSxJQUFJLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVwRSxJQUFJLFVBQVUsR0FBRztJQUNiLElBQUksRUFBRSxXQUFXO0lBQ2pCLFdBQVcsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHVDQUF1QztZQUMvQyxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ1gsRUFBQyxPQUFPLEVBQUUsd0NBQXdDO1lBQ2xELElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztDQUNyQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUU7SUFDbEQsSUFBSSxFQUFFLFVBQVU7Q0FDbkIsQ0FBQyxDQUFDO0FBRUg7O1FBRUksSUFBSSxJQUFJLEdBQUcsTUFBTSxXQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEMsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxRQUFRLENBQUMsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTdDLENBQUM7Q0FBQTtBQUVELE9BQU8sRUFBRSxDQUFDO0FBRVYsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDakUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7SUFDL0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBRW5CLGlCQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDTCxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDO1NBQzlDO0tBQ0osRUFBRSxDQUFDLFFBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBMEI7Z0JBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6IkhUTUxFeHBvcnRJbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
