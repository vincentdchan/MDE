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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBS0E7SUFZSSxZQUFZLE1BQWtCO1FBRnRCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWEsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFTLENBQUM7SUFDdEMsQ0FBQztJQUVELFlBQVk7UUFDUixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxDQUFTLEVBQUUsU0FBbUI7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUFhLEVBQUUsS0FBaUI7UUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDO1lBRUwsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsQ0FBQztnQkFDYixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU8sV0FBVztJQUNuQixDQUFDO0lBRU8sY0FBYztJQUN0QixDQUFDO0lBRU8sY0FBYztJQUV0QixDQUFDO0lBRU8sZ0JBQWdCO0lBRXhCLENBQUM7SUFFTyxXQUFXO0lBRW5CLENBQUM7SUFFTyxlQUFlO0lBRXZCLENBQUM7SUFFTyxnQkFBZ0I7SUFFeEIsQ0FBQztBQUVMLENBQUM7QUF4RVksY0FBTSxTQXdFbEIsQ0FBQSIsImZpbGUiOiJjb250cm9sbGVyL3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
