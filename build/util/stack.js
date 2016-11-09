"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBb0IsU0FFcEIsQ0FBQyxDQUY0QjtBQVc3QjtJQUtJLFlBQVksU0FBaUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQUssRUFBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBTTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSTtRQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7QUFFTCxDQUFDO0FBOUJZLG9CQUFZLGVBOEJ4QixDQUFBIiwiZmlsZSI6InV0aWwvc3RhY2suanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
