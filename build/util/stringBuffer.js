"use strict";
class StringBuffer {
    constructor() {
        this._buf = new Array();
    }
    get buffer() {
        return this._buf;
    }
    push(s) {
        this._buf.push(s);
    }
    getStr() {
        return this._buf.join("");
    }
    get length() {
        return this._buf.length;
    }
}
exports.StringBuffer = StringBuffer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0cmluZ0J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFRSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBTkQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQU1ELElBQUksQ0FBQyxDQUFVO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0FBRUwsQ0FBQztBQXhCWSxvQkFBWSxlQXdCeEIsQ0FBQSIsImZpbGUiOiJ1dGlsL3N0cmluZ0J1ZmZlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
