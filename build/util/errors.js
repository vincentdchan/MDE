"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHFCQUFnQyxTQUFRLEtBQUs7SUFNekMsWUFBWSxJQUFPLEVBQUUsR0FBTyxFQUFFLEdBQU87UUFDakMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYztZQUN6QixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDbEIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSztZQUNyQixHQUFHLENBQUM7SUFDWixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBRUo7QUE5QkQsMENBOEJDIiwiZmlsZSI6InV0aWwvZXJyb3JzLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
