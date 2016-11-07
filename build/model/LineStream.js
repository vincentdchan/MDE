"use strict";
class LineStream {
    constructor(_model, _line) {
        this._model = _model;
        this._line = _line;
        this._lineModel = this._model.lineAt(_line);
        this._index = 0;
    }
    eol() {
        return this._index >= this._lineModel.length;
    }
    sol() {
        return this._index == 0;
    }
    peek() {
        let next_index = this._index + 1;
        return next_index >= this._lineModel.length ?
            null : this._lineModel.charAt(next_index);
    }
    next() {
        let next_index = ++this._index;
        return next_index >= this._lineModel.length ?
            null : this._lineModel.charAt(next_index);
    }
    eat(match) {
        throw new Error("Not implmented.");
    }
    eatWhile() {
        throw new Error("Not implmented.");
    }
    eatSpace() {
        throw new Error("Not implmented.");
    }
    skipToEnd() {
        this._index = this._lineModel.length;
    }
    skipTo(ch) {
        throw new Error("Not implmented.");
    }
    match(pattern, consume, caseFold) {
        throw new Error("Not implmented.");
    }
    backUp(n) {
        throw new Error("Not implmented.");
    }
    column() {
        throw new Error("Not implmented.");
    }
    indentation() {
        throw new Error("Not implmented.");
    }
    current() {
        throw new Error("Not implmented.");
    }
}
exports.LineStream = LineStream;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9MaW5lU3RyZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFzRUE7SUFPSSxZQUFZLE1BQWlCLEVBQUUsS0FBYTtRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxHQUFHO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDakQsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLFVBQVUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsTUFBTSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07WUFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxHQUFHLENBQUMsS0FBb0Q7UUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQVU7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUlELEtBQUssQ0FBQyxPQUF3QixFQUFFLE9BQWlCLEVBQUUsUUFBa0I7UUFDakUsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBVTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTztRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0FBRUwsQ0FBQztBQTVFWSxrQkFBVSxhQTRFdEIsQ0FBQSIsImZpbGUiOiJtb2RlbC9MaW5lU3RyZWFtLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
