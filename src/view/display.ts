import {TextModel} from "../model/textModel"
import {LineModel} from "../model/lineModel"
import {VirtualDOMGenerator} from "../model/virtualDOMGenerator"

export function Display(textModel: TextModel) {

    let gen = new VirtualDOMGenerator(textModel);
    let vdom = gen.generate();

    let realDOM = vdom.render();

    document.body.appendChild(realDOM);

}
