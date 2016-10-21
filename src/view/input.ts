import {IElement, elem} from "../util/dom"

export class Input implements IElement {

    private _element : HTMLTextAreaElement;

    private _inputEventHandlers : Array<(Input, Event) => void>;
    private _backSpaceEventHandlers : Array<(Input, Event) => void>;
    private _keyDownEventHandlers : Array<(Input, Event) => void>;
    private _newLineEventHandlers : Array<(Input, Event) => void>;

    private _isComposing : boolean;

    constructor() {
        this._element = <HTMLTextAreaElement>(elem("textarea", "input-textarea"));

        this._element.style.position = "absolute";
        this._element.style.zIndex = "-1";
        this._element.style.opacity = "0";

        this._inputEventHandlers = new Array<(Input, Event)=>void>();
        this._backSpaceEventHandlers = new Array<(Input, Event)=>void>();
        this._newLineEventHandlers = new Array<(Input, Event)=>void>();
        this._keyDownEventHandlers = new Array<(Input, KeyboardEvent) => void>();
        this._isComposing = false;

        this._element.addEventListener("input", (ev : Event) => {
            if (! this._isComposing) {
                this.fireInputEvent(this, ev);
            }
        });

        this._element.addEventListener("compositionstart", (ev: Event) => {
            this._isComposing = true;
        });

        this._element.addEventListener("compositionend", (ev: any) => {
            this._isComposing = false;
        });

        this._element.addEventListener("keydown", (e : KeyboardEvent) => {
            this.fireKeyDownEvent(this, e);
        })
    }

    setCoordinate(x : number, y : number) {
        this._element.style.left = x + "px";
        this._element.style.top = y + "px";
    }

    private fireInputEvent(input : Input, e : Event) {
        for (let i = 0; i < this._inputEventHandlers.length; i++) {
            this._inputEventHandlers[i](input, e);
        }
    }

    private fireBackSpaceEvent(input : Input, e : Event) {
        for (let i = 0; i < this._backSpaceEventHandlers.length; i++) {
            this._backSpaceEventHandlers[i](input, e);
        }
    }

    private fireNewLineEvent(input : Input , e : Event) {
        for (let i = 0 ; i < this._newLineEventHandlers.length; i++) {
            this._newLineEventHandlers[i](input, e);
        }
    }

    private fireKeyDownEvent(input : Input, e : KeyboardEvent) {
        for (let i = 0; i < this._keyDownEventHandlers.length; i++) {
            this._keyDownEventHandlers[i](input, e);
        }
    }

    onInputEvent(fun : (Input, Event)=>void) {
        this._inputEventHandlers.push(fun);
    }

    onKeyboardEvent(fun : (Input, KeyboardEvent)=>void) {
        this._keyDownEventHandlers.push(fun);
    }

    get value() {
        return this._element.value;
    }

    set value(text : string) {
        this._element.value = text;
    }

    get isComposing() {
        return this._isComposing;
    }

    focus() {
        this._element.focus();
    }

    getElement() {
        return this._element
    }

    appendTo(elem : HTMLElement) {
        elem.appendChild(this._element);
    }

}
