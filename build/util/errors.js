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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsOEJBQXdDLEtBQUs7SUFNekMsWUFBWSxJQUFPLEVBQUUsR0FBTyxFQUFFLEdBQU87UUFDakMsTUFBTSxlQUFlLENBQUMsQ0FBQTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWM7WUFDekIsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSTtZQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDckIsR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztBQUVMLENBQUM7QUE5QlksdUJBQWUsa0JBOEIzQixDQUFBIiwiZmlsZSI6InV0aWwvZXJyb3JzLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
