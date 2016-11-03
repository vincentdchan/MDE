import {TextModel} from "./textModel"
import {LineModel} from "./lineModel"
import {VElement} from "../virtualDOM/vElement"

export class VirtualDOMGenerator {

    root: VElement;
    textModel: TextModel;

    constructor(textModel: TextModel) {
        this.root = new VElement("div", {
            "class": "editor-frame"
        }, []);
        this.textModel = textModel;
    }

    generate() : VElement {
        for (let i = 1; i <= this.textModel.linesCount; i++) {
            let lineElm = new VElement("div", {
                "class": "editor-line"
            }, []);
            let lineSpan = new VElement("span", null, []);
            lineElm.children.push(lineSpan);

            lineSpan.children.push(this.textModel.lineAt(i).text);

            this.root.children.push(lineElm);
        }

        return this.root;
    }

}
