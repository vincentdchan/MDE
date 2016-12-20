"use strict";
(function (MarkdownTokenType) {
    MarkdownTokenType[MarkdownTokenType["Space"] = 0] = "Space";
    MarkdownTokenType[MarkdownTokenType["Hr"] = 1] = "Hr";
    MarkdownTokenType[MarkdownTokenType["Heading1"] = 2] = "Heading1";
    MarkdownTokenType[MarkdownTokenType["Heading2"] = 3] = "Heading2";
    MarkdownTokenType[MarkdownTokenType["Heading3"] = 4] = "Heading3";
    MarkdownTokenType[MarkdownTokenType["Code"] = 5] = "Code";
    MarkdownTokenType[MarkdownTokenType["Table"] = 6] = "Table";
    MarkdownTokenType[MarkdownTokenType["BlockquoteStart"] = 7] = "BlockquoteStart";
    MarkdownTokenType[MarkdownTokenType["ListStart"] = 8] = "ListStart";
    MarkdownTokenType[MarkdownTokenType["ListItemStart"] = 9] = "ListItemStart";
    MarkdownTokenType[MarkdownTokenType["LooseItemStart"] = 10] = "LooseItemStart";
    MarkdownTokenType[MarkdownTokenType["Html"] = 11] = "Html";
    MarkdownTokenType[MarkdownTokenType["Paragraph"] = 12] = "Paragraph";
    MarkdownTokenType[MarkdownTokenType["Text"] = 13] = "Text";
    MarkdownTokenType[MarkdownTokenType["Bold"] = 14] = "Bold";
    MarkdownTokenType[MarkdownTokenType["Italic"] = 15] = "Italic";
    MarkdownTokenType[MarkdownTokenType["Pre"] = 16] = "Pre";
})(exports.MarkdownTokenType || (exports.MarkdownTokenType = {}));
var MarkdownTokenType = exports.MarkdownTokenType;
class MarkdownTokenizeState {
    constructor() {
        this._is_start_of_line = true;
        this._in_pre = false;
        this._in_bold = false;
        this._in_italic = false;
        this._is_blockquote = false;
        this._title_level = 0;
    }
    copy() {
        let newObj = new MarkdownTokenizeState();
        newObj._in_bold = this._in_bold;
        newObj._in_italic = this._in_italic;
        newObj._in_pre = this._in_pre;
        return newObj;
    }
    get isStartOfLine() { return this._is_start_of_line; }
    set isStartOfLine(v) { this._is_start_of_line = v; }
    get inPre() { return this._in_pre; }
    set inPre(v) { this._in_pre = v; }
    get inBold() { return this._in_bold; }
    set inBold(v) { this._in_bold = v; }
    get inItalic() { return this._in_italic; }
    set inItalic(v) { this._in_italic = v; }
    get isBlockquote() { return this._is_blockquote; }
    set isBlockquote(v) { this._is_blockquote = v; }
    get titleLevel() { return this._title_level; }
    set titleLevel(v) { this._title_level = v; }
}
exports.MarkdownTokenizeState = MarkdownTokenizeState;
class MarkdownTokenizer {
    startState() {
        return new MarkdownTokenizeState();
    }
    tokenize(stream, state) {
        if (state.isStartOfLine) {
            stream.eatWhile();
            if (stream.match(/^###/, true)) {
                stream.skipToEnd();
                return MarkdownTokenType.Heading3;
            }
            else if (stream.match(/^##/, true)) {
                stream.skipToEnd();
                return MarkdownTokenType.Heading2;
            }
            else if (stream.match(/^#/, true)) {
                stream.skipToEnd();
                return MarkdownTokenType.Heading1;
            }
            else if (stream.match(/^-/, true)) {
                return MarkdownTokenType.ListItemStart;
            }
            state.isStartOfLine = false;
        }
        if (state.inBold) {
            while (stream.skipTo("*")) {
                if (stream.match(/\*\*/, true)) {
                    state.inBold = false;
                    return MarkdownTokenType.Bold;
                }
                else {
                    stream.next();
                }
            }
            stream.skipToEnd();
            return MarkdownTokenType.Bold;
        }
        else if (state.inItalic) {
            if (stream.skipTo("*")) {
                stream.next();
                state.inItalic = false;
            }
            else
                stream.skipToEnd();
            return MarkdownTokenType.Italic;
        }
        else if (state.inPre) {
            stream.skipTo("`");
            if (stream.match(/^`+/, true)) {
                state.inPre = false;
                return MarkdownTokenType.Pre;
            }
            stream.skipToEnd();
            return MarkdownTokenType.Pre;
        }
        else {
            if (stream.match(/^\*\*/, true)) {
                state.inBold = true;
                return MarkdownTokenType.Bold;
            }
            else if (stream.match(/^\*/, true)) {
                state.inItalic = true;
                return MarkdownTokenType.Italic;
            }
            else if (stream.match(/^`+/, true)) {
                state.inPre = true;
                return MarkdownTokenType.Pre;
            }
        }
        stream.next();
        return MarkdownTokenType.Text;
    }
    copyState(state) {
        return state.copy();
    }
}
exports.MarkdownTokenizer = MarkdownTokenizer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL21hcmtkb3duVG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxXQUFZLGlCQUFpQjtJQUN6QiwyREFBSyxDQUFBO0lBQ0wscURBQUUsQ0FBQTtJQUNGLGlFQUFRLENBQUE7SUFDUixpRUFBUSxDQUFBO0lBQ1IsaUVBQVEsQ0FBQTtJQUNSLHlEQUFJLENBQUE7SUFDSiwyREFBSyxDQUFBO0lBQ0wsK0VBQWUsQ0FBQTtJQUNmLG1FQUFTLENBQUE7SUFDVCwyRUFBYSxDQUFBO0lBQ2IsOEVBQWMsQ0FBQTtJQUNkLDBEQUFJLENBQUE7SUFDSixvRUFBUyxDQUFBO0lBQ1QsMERBQUksQ0FBQTtJQUNKLDBEQUFJLENBQUE7SUFBRSw4REFBTSxDQUFBO0lBQUUsd0RBQUcsQ0FBQTtBQUNyQixDQUFDLEVBaEJXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFnQjVCO0FBaEJELElBQVksaUJBQWlCLEdBQWpCLHlCQWdCWCxDQUFBO0FBRUQ7SUFTSTtRQVBRLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztJQUlqQyxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksTUFBTSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLGFBQWEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFD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
