import {DomHelper, IDisposable} from "../util"
import {ButtonView} from "./viewButton"

export interface ButtonOption {
    name: string;
    text?: string;
    icon?: string;
    spanClass?: string;
    onClick?: (e : MouseEvent) => void;
    onHover?: (e : MouseEvent) => void;
}

export class ToolbarView extends DomHelper.FixedElement implements IDisposable {

    public static readonly DefaultHeight = 36;
    private buttonContainer : HTMLDivElement;
    private buttonViews : ButtonView[];
    private buttonNamesMap : Map<string, number>;
    private _name : string;

    constructor(options: ButtonOption[]) {
        super("div", "mde-toolbar");

        this.height = ToolbarView.DefaultHeight;
        this._dom.style.background = "grey";
        this._dom.style.overflowX = "scroll";
        this._dom.style.overflowY = "hidden";
        this._dom.style.whiteSpace = "nowrap";

        this.buttonContainer = <HTMLDivElement>DomHelper.elem("div", "toolbar-button-container");
        this._dom.appendChild(this.buttonContainer);

        this.buttonViews = [];
        this.buttonNamesMap = new Map<string, number>();
        options.forEach((value: ButtonOption, index:number) => {
            let bv = new ButtonView(ToolbarView.DefaultHeight, ToolbarView.DefaultHeight);

            if (value.spanClass) {
                let span = <HTMLSpanElement>DomHelper.elem("span", value.spanClass);
                bv.setContent(span);

                if (value.text) {
                    bv.setTooltip(value.text);
                }
            } else if(value.icon) {
                bv.setIcon(value.icon);

                if (value.text) {
                    bv.setTooltip(value.text);
                }
            } else if (value.text) {
                bv.setText(value.text);
            } else {
                bv.setText(value.name);
            }

            this.buttonViews.push(bv);
            this.buttonNamesMap.set(value.name, index);

            bv.element().style.position = "relative"
            bv.appendTo(this.buttonContainer);
        });
    }

    getButtonViewByIndex(index: number) : ButtonView {
        if (index < 0 || index >= this.buttonViews.length)
            throw new Error("Index out of range, can not find the button view. #Index:" + index);
        return this.buttonViews[index];
    }

    getButtonViewByName(name: string) : ButtonView {
        let index = this.buttonNamesMap.get(name);
        if (index !== undefined)
            return this.buttonViews[index];
        else
            throw new Error("Button doesn't exisit. #Name:" + name);
    }

    removeButtonByName(name: string) {
        let button = this.getButtonViewByName(name);
        button.dispose();
    }

    removeButtonByIndex(index: number) {
        let button = this.getButtonViewByIndex(index);
        button.dispose();
    }

    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
