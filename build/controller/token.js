"use strict";
(function (TokenType) {
    TokenType[TokenType["Tab"] = 0] = "Tab";
    TokenType[TokenType["Space"] = 1] = "Space";
    TokenType[TokenType["Hash"] = 2] = "Hash";
    TokenType[TokenType["Star"] = 3] = "Star";
    TokenType[TokenType["HtmlTag"] = 4] = "HtmlTag";
    TokenType[TokenType["GT"] = 5] = "GT";
    TokenType[TokenType["ShortBar"] = 6] = "ShortBar";
    TokenType[TokenType["Text"] = 7] = "Text";
    TokenType[TokenType["Number"] = 8] = "Number";
    TokenType[TokenType["LineBreak"] = 9] = "LineBreak";
})(exports.TokenType || (exports.TokenType = {}));
var TokenType = exports.TokenType;
class Token {
    constructor(_type, _text) {
        this._type = _type;
        if (_text) {
            this._text = _text;
        }
        else {
            this._text = null;
        }
    }
    get type() {
        return this._type;
    }
    get text() {
        return this._text;
    }
}
exports.Token = Token;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxXQUFZLFNBQVM7SUFDakIsdUNBQUcsQ0FBQTtJQUFFLDJDQUFLLENBQUE7SUFBRSx5Q0FBSSxDQUFBO0lBQUUseUNBQUksQ0FBQTtJQUFFLCtDQUFPLENBQUE7SUFBRSxxQ0FBRSxDQUFBO0lBQ25DLGlEQUFRLENBQUE7SUFBRSx5Q0FBSSxDQUFBO0lBQUUsNkNBQU0sQ0FBQTtJQUFFLG1EQUFTLENBQUE7QUFDckMsQ0FBQyxFQUhXLGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFIRCxJQUFZLFNBQVMsR0FBVCxpQkFHWCxDQUFBO0FBRUQ7SUFLSSxZQUFZLEtBQWlCLEVBQUUsS0FBZTtRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztBQUVMLENBQUM7QUF0QlksYUFBSyxRQXNCakIsQ0FBQSIsImZpbGUiOiJjb250cm9sbGVyL3Rva2VuLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
