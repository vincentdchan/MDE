"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3N0cmluZ0J1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBO0lBSUksSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUVEO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBVTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQztDQUVKO0FBeEJELG9DQXdCQyIsImZpbGUiOiJ1dGlsL3N0cmluZ0J1ZmZlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
