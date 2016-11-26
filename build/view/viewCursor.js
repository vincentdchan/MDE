"use strict";
const util_1 = require("../util");
class CursorView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(scrollTopThunk) {
        super("div", "mde-cursor");
        this._scrollTopThunk = scrollTopThunk;
        this._dom.style.position = "absolute";
        this._dom.style.height = "1em";
        this._dom.style.width = "0.2em";
        this._dom.style.background = "black";
        this.initializeBlinking();
    }
    initializeBlinking() {
        this.setInterval();
    }
    setInterval() {
        let showed = true;
        this._internal = setInterval(() => {
            if (showed) {
                this._dom.style.opacity = "1";
            }
            else {
                this._dom.style.opacity = "0";
            }
            showed = !showed;
        }, 500);
    }
    clearInterval() {
        clearInterval(this._internal);
    }
    excite() {
        this.clearInterval();
        this._dom.style.opacity = "1";
        this.setInterval();
    }
    setOff() {
        this.clearInterval();
        this._dom.style.opacity = "0";
    }
    setPostition(coordinate) {
        this._dom.style.left = coordinate.x + "px";
        this._dom.style.top = coordinate.y + this._scrollTopThunk() + "px";
    }
    dispose() {
        if (this._dom) {
            this._dom.parentElement.removeChild(this._dom);
            this._dom = null;
        }
    }
}
exports.CursorView = CursorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
