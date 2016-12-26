"use strict";
const util_1 = require("../util");
class InputerView extends util_1.DomHelper.Generic.AbsoluteElement {
    constructor() {
        super("textarea", "mde-inputer");
        this._focused = false;
        this._isCompositing = false;
        this._isComposintThunkTimers = [];
        this._dom.addEventListener("focus", (evt) => {
            this._focused = true;
        });
        this._dom.addEventListener("blur", (evt) => {
            this._focused = false;
        });
        this._dom.addEventListener("compositionstart", (evt) => {
            this._isCompositing = true;
        });
        this._dom.addEventListener("compositionend", (evt) => {
            this._isComposintThunkTimers.push(setTimeout(() => {
                this._isCompositing = false;
            }, 5));
        });
    }
    clearContent() {
        this._dom.value = "";
    }
    setAbsoluteCoordinate(coordinate) {
        this.left = coordinate.x;
        this.top = coordinate.y;
    }
    isFosused() {
        return this._focused;
    }
    isCompositioning() {
        return this._isCompositing;
    }
    dispose() {
        this._isComposintThunkTimers.forEach((t) => {
            clearTimeout(t);
        });
    }
    hide() {
        this._dom.style.display = "none";
    }
    show() {
        this._dom.style.display = "block";
    }
    isHidden() {
        return this._dom.style.display == "none";
    }
    get value() {
        return this._dom.value;
    }
    set value(content) {
        this._dom.value = content;
    }
}
exports.InputerView = InputerView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
