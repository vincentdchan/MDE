"use strict";
class VirtualLine {
    constructor(line, words) {
        this._line = line;
        if (words)
            this._words = words;
        else
            this._words = [];
    }
    get lineNumber() {
        return this._line;
    }
    get words() {
        return this._words;
    }
}
exports.VirtualLine = VirtualLine;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsL3ZpcnR1YWxMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUlJLFlBQVksSUFBWSxFQUFFLEtBQXFCO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUk7WUFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBcEJZLG1CQUFXLGNBb0J2QixDQUFBIiwiZmlsZSI6Im1vZGVsL3ZpcnR1YWwvdmlydHVhbExpbmUuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
