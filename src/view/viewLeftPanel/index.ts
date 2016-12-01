import {DomHelper, IDisposable} from "../../util"
import {ButtonView} from "./../viewButton"
import {ButtonOption} from "../"

const DefaultLeftPanelButtonOptions : ButtonOption[] = [
    {
        name: "textAnalyzer",
        text: "Text Analyzer",
        icon: "fa fa-code",
    },
    {
        name: "setting",
        text: "Setting",
        icon: "fa fa-cog",
    }
];

interface PanelEventListener {
    (elem: DomHelper.IDOMWrapper, evt: Event) : void;
}

class NavigationView extends DomHelper.AbsoluteElement implements IDisposable {

    public static readonly DefaultWidth = 48;
    private _container : HTMLDivElement = null;

    constructor(width: number, height: number, options: ButtonOption[]) {
        super("div", "mde-left-panel-nav");

        width = width >=0 ? width : NavigationView.DefaultWidth;
        height = height >=0 ? height : NavigationView.DefaultWidth;

        this._container = <HTMLDivElement>DomHelper.elem("div", "mde-left-panel-nav-container");
        this._dom.appendChild(this._container);

        this.width = width;
        this.height = height;
        this._dom.style.fontSize = NavigationView.DefaultWidth * 0.6 + "px";
        this._dom.style.background = "grey";

        options.forEach((ButtonOption) => {
            let bv = new ButtonView(width, width);
            bv.setContentFromOption(ButtonOption);
            bv.appendTo(this._container);
        });
    }

    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}

class ContentContainer extends DomHelper.AbsoluteElement implements IDisposable {

    constructor() {
        super("div", "mde-left-panel-content-container");
    }

    /// this is the fast way to clear all the children
    /// according to: http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    clearContent() {
        while(this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

    appendChild(elem: Node | DomHelper.IDOMWrapper) {
        if (elem instanceof Node) {
            this._dom.appendChild(elem);
        } else if (DomHelper.isIDOMWrapper(elem)) {
            elem.appendTo(this._dom);
        } else {
            throw new Error("Appending the wrong type.");
        }
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}

class CollapseEvent {

}

///
/// Event:
/// 
/// - collapsed
/// - expanded
///
export class LeftPanelView extends DomHelper.FixedElement implements IDisposable {

    public static readonly MinWidth = 100;
    private _nav_view : NavigationView = null;
    private _container : ContentContainer = null;
    private _collapsed : boolean = false;
    private _remember_width : number;

    constructor(width: number, height: number) {
        super("div", "mde-left-panel");

        this._dom.style.background = "lightgrey";
        this._dom.style.cssFloat = "left";

        this._nav_view = new NavigationView(-1, 
            height, DefaultLeftPanelButtonOptions);
        this._nav_view.appendTo(this._dom);

        this._container = new ContentContainer();
        this._container.marginLeft = this._nav_view.width;
        this._container.appendTo(this._dom);

        this.width = width;
        this.height = height;

    }

    get collapsed() {
        return this._collapsed;
    }

    set collapsed(v : boolean) {
        if (v !== this._collapsed) {
            this._collapsed = v;

            if (this._collapsed) {
                this._remember_width = this.width;
                this.width = this._nav_view.width;

                this._container.element().style.display = "none";

                let evt = new Event("collapsed");
                this._dom.dispatchEvent(evt);
            } else {
                this.width = this._remember_width;
                this._container.element().style.display = "block";

                let evt = new Event("expanded");
                this._dom.dispatchEvent(evt);
            }
        }
    }

    set width(w: number) {
        super.width = w;
        this._container.width = w - this._nav_view.width;
    }

    get width() {
        return super.width;
    }

    set height(h: number) {
        super.height = h;
        this._nav_view.height = h;
        this._container.height = h;
    }

    get height() {
        return super.height;
    }

    get navView() {
        return this._nav_view;
    }

    dispose() {
        if (this._dom != null) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }

}