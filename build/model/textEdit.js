"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC90ZXh0RWRpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUNBQTZDO0FBQzdDLHdCQUFzRDtBQUV0RCxJQUFZLFlBRVg7QUFGRCxXQUFZLFlBQVk7SUFDcEIsMkRBQVUsQ0FBQTtJQUFFLDJEQUFVLENBQUE7SUFBRSw2REFBVyxDQUFBO0FBQ3ZDLENBQUMsRUFGVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUV2QjtBQUVEO0lBUUksWUFBWSxLQUFtQixFQUFFLEdBQXFCLEVBQUUsS0FBYztRQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FDSixDQUFDO1lBQ0csSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsSUFBSSxXQUFXLEdBQWMsSUFBSSxDQUFDO1lBRWxDLElBQUksQ0FBQyxXQUFXLEdBQUc7Z0JBQ2YsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFdBQVcsR0FBRyx1QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEMsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsV0FBVyxDQUFDO2dCQUN2QixDQUFDO1lBRUwsQ0FBQyxDQUFBO1FBRUwsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLGFBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLFdBQVcsSUFBSSxVQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxVQUFVLElBQUksVUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSTtZQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUVKO0FBOURELDRCQThEQyIsImZpbGUiOiJtb2RlbC90ZXh0RWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
