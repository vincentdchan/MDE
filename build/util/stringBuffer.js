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
}
exports.StringBuffer = StringBuffer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0cmluZ0J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFRSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBTkQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQU1ELElBQUksQ0FBQyxDQUFVO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztBQUVMLENBQUM7QUFwQlksb0JBQVksZUFvQnhCLENBQUEiLCJmaWxlIjoidXRpbC9zdHJpbmdCdWZmZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
