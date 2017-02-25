"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TickTockUtil {
    constructor(ms) {
        this._pairs = [];
        let tick = false;
        this._timer = setInterval(() => {
            if (tick) {
                this._pairs.forEach((pair) => {
                    pair.tick();
                });
            }
            else {
                this._pairs.forEach((pair) => {
                    pair.tock();
                });
            }
            tick = !tick;
        }, ms);
    }
    register(pair) {
        this._pairs.push(pair);
    }
    unregister(pair) {
        let pairIndex;
        for (pairIndex = 0; pairIndex < this._pairs.length; pairIndex++) {
            if (this._pairs[pairIndex] === pair)
                break;
        }
        if (pairIndex < this._pairs.length) {
            if (this._pairs.length === 1) {
                this._pairs = [];
            }
            else {
                for (let i = pairIndex; i < this._pairs.length - 1; i++) {
                    this._pairs[i] = this._pairs[i + 1];
                }
                this._pairs.length--;
            }
            return true;
        }
        return false;
    }
    dispose() {
        clearInterval(this._timer);
    }
}
exports.TickTockUtil = TickTockUtil;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
