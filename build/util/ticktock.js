"use strict";
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
