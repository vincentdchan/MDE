import {DomWrapper, IDisposable} from "../util"
import {ButtonView} from "./viewButton"
import {ButtonOption} from "."
import {Dom} from "typescript-domhelper"

export class ToolbarView extends DomWrapper.FixedElement implements IDisposable {

    public static readonly DefaultHeight = 36;
    private buttonContainer : HTMLDivElement;
    private buttonViews : ButtonView[];
    private buttonNamesMap : Map<string, number>;
    private _name : string;

    constructor(options: ButtonOption[], rightOptions?: ButtonOption[]) {
        super("div", "mde-toolbar");

        this.height = ToolbarView.DefaultHeight;
        this._dom.style.overflowX = "scroll";
        this._dom.style.overflowY = "hidden";
        this._dom.style.whiteSpace = "nowrap";

        this.buttonContainer = Dom.Div("toolbar-button-container");
        this._dom.appendChild(this.buttonContainer);

        this.buttonViews = [];
        this.buttonNamesMap = new Map<string, number>();

        options.forEach((value: ButtonOption, index:number) => {
            let bv = new ButtonView(ToolbarView.DefaultHeight, ToolbarView.DefaultHeight);

            bv.setContentFromOption(value);

            this.buttonViews.push(bv);
            this.buttonNamesMap.set(value.name, index);

            bv.element().style.position = "relative"
            bv.appendTo(this.buttonContainer);

            if (value.onClick) {
                bv.on("click", (e: MouseEvent) => {
                    value.onClick(e);
                })
            }

        });

        if (rightOptions) {
            rightOptions.forEach((value: ButtonOption, index: number) => {
                let bv = new ButtonView(ToolbarView.DefaultHeight, ToolbarView.DefaultHeight);

                bv.setContentFromOption(value);

                this.buttonViews.push(bv);
                this.buttonNamesMap.set(value.name, index);

                bv.element().style.position = "relative"
                bv.element().style.cssFloat = "right";
                bv.appendTo(this.buttonContainer);

                if (value.onClick) {
                    bv.on("click", (e: MouseEvent) => {
                        value.onClick(e);
                    })
                }

            });
        }

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
    }

}
