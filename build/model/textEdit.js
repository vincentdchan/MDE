"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("../util/text");
const _1 = require(".");
var TextEditType;
(function (TextEditType) {
    TextEditType[TextEditType["InsertText"] = 0] = "InsertText";
    TextEditType[TextEditType["DeleteText"] = 1] = "DeleteText";
    TextEditType[TextEditType["ReplaceText"] = 2] = "ReplaceText";
})(TextEditType = exports.TextEditType || (exports.TextEditType = {}));
class TextEdit {
    constructor(_type, _rp, _text) {
        this._type = _type;
        if (_text === undefined)
            this._text = null;
        else {
            this._text = _text;
            let _parseLines = null;
            this._linesThunk = () => {
                if (_parseLines === null) {
                    _parseLines = text_1.parseTextToLines(_text);
                    return _parseLines;
                }
                else {
                    return _parseLines;
                }
            };
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
        return this._linesThunk();
    }
}
exports.TextEdit = TextEdit;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC90ZXh0RWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUE2QztBQUM3Qyx3QkFBc0Q7QUFFdEQsSUFBWSxZQUVYO0FBRkQsV0FBWSxZQUFZO0lBQ3BCLDJEQUFVLENBQUE7SUFBRSwyREFBVSxDQUFBO0lBQUUsNkRBQVcsQ0FBQTtBQUN2QyxDQUFDLEVBRlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFFdkI7QUFFRDtJQVFJLFlBQVksS0FBbUIsRUFBRSxHQUFxQixFQUFFLEtBQWM7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQ0osQ0FBQztZQUNHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRW5CLElBQUksV0FBVyxHQUFjLElBQUksQ0FBQztZQUVsQyxJQUFJLENBQUMsV0FBVyxHQUFHO2dCQUNmLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2QixXQUFXLEdBQUcsdUJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsQ0FBQztZQUVMLENBQUMsQ0FBQTtRQUVMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLFVBQVUsSUFBSSxhQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxXQUFXLElBQUksVUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLFVBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUk7WUFDRixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUE7SUFDekIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FFSjtBQTlERCw0QkE4REMiLCJmaWxlIjoibW9kZWwvdGV4dEVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
