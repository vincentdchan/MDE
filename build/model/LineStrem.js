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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9MaW5lU3RyZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQXNFQTtJQU9JLFlBQVksTUFBaUIsRUFBRSxLQUFhO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELEdBQUc7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNqRCxDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksVUFBVSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELEdBQUcsQ0FBQyxLQUFvRDtRQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBSUQsS0FBSyxDQUFDLE9BQXdCLEVBQUUsT0FBaUIsRUFBRSxRQUFrQjtRQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFVO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7QUFFTCxDQUFDO0FBQUEiLCJmaWxlIjoibW9kZWwvTGluZVN0cmVtLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
