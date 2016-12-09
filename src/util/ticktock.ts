import {IDisposable} from "."

export interface TickTockPair {
    tick: () => any;
    tock: () => any;
}

export class TickTockUtil implements IDisposable {

    private _pairs: TickTockPair[] = [];
    private _timer: any;

    constructor(ms) {
        let tick = false;
        this._timer = setInterval(() => {
            if (tick) {
                this._pairs.forEach((pair: TickTockPair) => {
                    pair.tick();
                });
            } else {
                this._pairs.forEach((pair: TickTockPair) => {
                    pair.tock();
                })
            }
            tick = !tick;
        }, ms);
    }

    register(pair: TickTockPair) {
        this._pairs.push(pair);
    }

    unregister(pair: TickTockPair): boolean {
        let pairIndex;
        for (pairIndex = 0; pairIndex < this._pairs.length; pairIndex++) {
            if (this._pairs[pairIndex] === pair) break;
        }
        if (pairIndex < this._pairs.length) {
            if (this._pairs.length === 1) {
                this._pairs = [];
            } else {
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
