"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("./queue");
class FixSizeStack {
    constructor(_fix_size) {
        this._fix_size = _fix_size;
        this._deque = new queue_1.Deque();
    }
    push(obj) {
        this._deque.push_back(obj);
        while (this._deque.size() > this._fix_size) {
            this._deque.pop_front();
        }
    }
    pop() {
        return this._deque.pop_back();
    }
    size() {
        return this._deque.size();
    }
    empty() {
        return this._deque.size() == 0;
    }
}
exports.FixSizeStack = FixSizeStack;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTZCO0FBVzdCO0lBS0ksWUFBWSxTQUFpQjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBSyxFQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksQ0FBQyxHQUFNO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJO1FBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUVKO0FBOUJELG9DQThCQyIsImZpbGUiOiJ1dGlsL3N0YWNrLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
