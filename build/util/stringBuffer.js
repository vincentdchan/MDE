"use strict";
class StringBuffer {
    get buffer() {
        return this._buf;
    }
    constructor() {
        this._buf = new Array();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0cmluZ0J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFJSSxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNwQixDQUFDO0lBRUQ7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFVO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0NBRUo7QUF4QkQsb0NBd0JDIiwiZmlsZSI6InV0aWwvc3RyaW5nQnVmZmVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
