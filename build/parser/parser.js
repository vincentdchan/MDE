"use strict";
class Parser {
    constructor(_model) {
        this._continue = true;
        this._model = _model;
        this._indentStack = new Array();
        this._nodes = new Array();
        this._errors = new Array();
    }
    beginParsing() {
        for (let i = 1; i <= this._model.linesCount; i++) {
            this.parseLine(i, this._model.getLineFromNum(i));
        }
    }
    reportError(e, _continue) {
        this._errors.push(e);
        this._continue = _continue;
    }
    parseLine(_num, _line) {
        for (let i = 0; i < _line.length; i++) {
            try {
            }
            catch (e) {
                if (this._continue) {
                    continue;
                }
                else {
                    break;
                }
            }
        }
    }
    parseHeader() {
    }
    parseParagraph() {
    }
    parseOrderList() {
    }
    parseUnorderList() {
    }
    parseAnchor() {
    }
    parseBlockQuote() {
    }
    parseHTMLElement() {
    }
}
exports.Parser = Parser;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQTtJQVlJLFlBQVksTUFBa0I7UUFGdEIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUcvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1FBRXJDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsWUFBWTtRQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLENBQVMsRUFBRSxTQUFtQjtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU8sU0FBUyxDQUFDLElBQWEsRUFBRSxLQUFpQjtRQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUM7WUFFTCxDQUFFO1lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDakIsUUFBUSxDQUFDO2dCQUNiLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXO0lBQ25CLENBQUM7SUFFTyxjQUFjO0lBQ3RCLENBQUM7SUFFTyxjQUFjO0lBRXRCLENBQUM7SUFFTyxnQkFBZ0I7SUFFeEIsQ0FBQztJQUVPLFdBQVc7SUFFbkIsQ0FBQztJQUVPLGVBQWU7SUFFdkIsQ0FBQztJQUVPLGdCQUFnQjtJQUV4QixDQUFDO0FBRUwsQ0FBQztBQXhFWSxjQUFNLFNBd0VsQixDQUFBIiwiZmlsZSI6InBhcnNlci9wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
