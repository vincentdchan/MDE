import {Display} from "./view/display"
import {TextModel} from "./model/textModel"

let content = 
"# title \n" +
"\n" +
"content\n" +
"something else\n"

let elem = document.getElementById("frame");

let textModel = new TextModel();

textModel.setFromRawText(content);
Display(textModel);

