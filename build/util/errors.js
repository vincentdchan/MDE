"use strict";
class NotInRangeError extends Error {
    constructor(data, max, min) {
        super("Not in range.");
        this._data = data;
        this._max = max;
        this._min = min;
        this.message = "<NotInRange " +
            "max=" + this._max +
            " min=" + this._min +
            " data=" + this._data +
            ">";
    }
    get maxBound() {
        return this._max;
    }
    get minBound() {
        return this._min;
    }
    get data() {
        return this._data;
    }
}
exports.NotInRangeError = NotInRangeError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEscUJBQWdDLFNBQVEsS0FBSztJQU16QyxZQUFZLElBQU8sRUFBRSxHQUFPLEVBQUUsR0FBTztRQUNqQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjO1lBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSTtZQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3JCLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Q0FFSjtBQTlCRCwwQ0E4QkMiLCJmaWxlIjoidXRpbC9lcnJvcnMuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
