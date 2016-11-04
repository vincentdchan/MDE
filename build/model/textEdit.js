"use strict";
const text_1 = require("../util/text");
const _1 = require(".");
(function (TextEditType) {
    TextEditType[TextEditType["InsertText"] = 0] = "InsertText";
    TextEditType[TextEditType["DeleteText"] = 1] = "DeleteText";
    TextEditType[TextEditType["ReplaceText"] = 2] = "ReplaceText";
})(exports.TextEditType || (exports.TextEditType = {}));
var TextEditType = exports.TextEditType;
class TextEdit {
    constructor(_type, _rp, _text) {
        this._type = _type;
        if (_text === undefined)
            this._text = null;
        else {
            this._text = _text;
            this._lines = text_1.parseTextToLines(_text);
        }
        if (_type == TextEditType.InsertText && _1.isPosition(_rp)) {
            this._position = _rp;
        }
        else if (_type == TextEditType.ReplaceText && _1.isRange(_rp)) {
            this._range = _rp;
        }
        else if (_type == TextEditType.DeleteText && _1.isRange(_rp)) {
            this._range = _rp;
        }
        else
            throw new Error("Error data input");
    }
    get type() {
        return this._type;
    }
    get range() {
        return this._range;
    }
    get position() {
        return this._position;
    }
    get text() {
        return this._text;
    }
    get lines() {
        return this._lines;
    }
}
exports.TextEdit = TextEdit;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC90ZXh0RWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQStCLGNBQy9CLENBQUMsQ0FENEM7QUFDN0MsbUJBQW1ELEdBRW5ELENBQUMsQ0FGcUQ7QUFFdEQsV0FBWSxZQUFZO0lBQ3BCLDJEQUFVLENBQUE7SUFBRSwyREFBVSxDQUFBO0lBQUUsNkRBQVcsQ0FBQTtBQUN2QyxDQUFDLEVBRlcsb0JBQVksS0FBWixvQkFBWSxRQUV2QjtBQUZELElBQVksWUFBWSxHQUFaLG9CQUVYLENBQUE7QUFFRDtJQVFJLFlBQVksS0FBbUIsRUFBRSxHQUFxQixFQUFFLEtBQWM7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQ0osQ0FBQztZQUNHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsdUJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLGFBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLFdBQVcsSUFBSSxVQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksVUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSTtZQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBbERZLGdCQUFRLFdBa0RwQixDQUFBIiwiZmlsZSI6Im1vZGVsL3RleHRFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
