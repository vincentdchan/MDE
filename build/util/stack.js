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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQ0FBNkI7QUFXN0I7SUFLSSxZQUFZLFNBQWlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFLLEVBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQU07UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUIsQ0FBQztJQUNMLENBQUM7SUFFRCxHQUFHO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUk7UUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBRUo7QUE5QkQsb0NBOEJDIiwiZmlsZSI6InV0aWwvc3RhY2suanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
