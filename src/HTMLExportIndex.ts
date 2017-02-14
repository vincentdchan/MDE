import * as CodeMirror from "codemirror"
require("codemirror/mode/htmlmixed/htmlmixed")
import {Host, i18n as $} from "./util"
import {remote} from "electron"
import * as fs from "fs"
import {html as html_beautify} from "js-beautify"

document.title = $.getString("exportHTML.title");

let htmlHead = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
  </head>
  <body>
`

let headTail = `
  </body>
</html>
`

let rawTextarea = <HTMLTextAreaElement>document.getElementById("htmlEditor");
let saveButton = <HTMLElement>document.getElementById("saveButton");

let myModeSpec = {
    name: "htmlmixed",
    scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                    mode: null},
                    {matches: /(text|application)\/(x-)?vb(a|script)/i,
                    mode: "vbscript"}]
};

let codeMirror = CodeMirror.fromTextArea(rawTextarea, {
    mode: myModeSpec
});

async function GetData() {

    let data = await Host.getExportHTML();
    data = htmlHead + data + headTail;
    codeMirror.setValue(html_beautify(data));

}

GetData();

saveButton.setAttribute("title", $.getString("exportHTML.save"));
saveButton.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();

    remote.dialog.showSaveDialog({
        filters: [
            {name: "HTML", extensions: ["html", "htm"]}
        ]
    }, (filePath: string) => {
        if (filePath) {
            let data = codeMirror.getValue();

            fs.writeFile(filePath, data, (err: NodeJS.ErrnoException) => {
                if (err) {
                    console.error(err);
                } else {
                    alert("Save success");
                }
            });
        }
    })
})
