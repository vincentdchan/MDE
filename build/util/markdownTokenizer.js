"use strict";
(function (MarkdownTokenType) {
    MarkdownTokenType[MarkdownTokenType["Space"] = 0] = "Space";
    MarkdownTokenType[MarkdownTokenType["Hr"] = 1] = "Hr";
    MarkdownTokenType[MarkdownTokenType["Heading"] = 2] = "Heading";
    MarkdownTokenType[MarkdownTokenType["Code"] = 3] = "Code";
    MarkdownTokenType[MarkdownTokenType["Table"] = 4] = "Table";
    MarkdownTokenType[MarkdownTokenType["BlockquoteStart"] = 5] = "BlockquoteStart";
    MarkdownTokenType[MarkdownTokenType["ListStart"] = 6] = "ListStart";
    MarkdownTokenType[MarkdownTokenType["ListItemStart"] = 7] = "ListItemStart";
    MarkdownTokenType[MarkdownTokenType["LooseItemStart"] = 8] = "LooseItemStart";
    MarkdownTokenType[MarkdownTokenType["Html"] = 9] = "Html";
    MarkdownTokenType[MarkdownTokenType["Paragraph"] = 10] = "Paragraph";
    MarkdownTokenType[MarkdownTokenType["Text"] = 11] = "Text";
    MarkdownTokenType[MarkdownTokenType["Bold"] = 12] = "Bold";
    MarkdownTokenType[MarkdownTokenType["Italic"] = 13] = "Italic";
    MarkdownTokenType[MarkdownTokenType["Pre"] = 14] = "Pre";
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
        if (state.inBold) {
            let matchOnce = false;
            while (stream.skipTo("*")) {
                matchOnce = true;
                if (stream.match(/\*\*/, true)) {
                    state.inBold = false;
                }
            }
            if (!matchOnce)
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
                state.inItalic = false;
                return MarkdownTokenType.Pre;
            }
            stream.skipToEnd();
        }
        else if (state.isStartOfLine) {
            stream.eatWhile();
            if (stream.match(/^#+/, true)) {
                stream.skipToEnd();
                return MarkdownTokenType.Heading;
            }
            state.isStartOfLine = false;
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
        stream.skipTo(" ");
        return MarkdownTokenType.Text;
    }
    copyState(state) {
        return state.copy();
    }
}
exports.MarkdownTokenizer = MarkdownTokenizer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL21hcmtkb3duVG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxXQUFZLGlCQUFpQjtJQUN6QiwyREFBSyxDQUFBO0lBQ0wscURBQUUsQ0FBQTtJQUNGLCtEQUFPLENBQUE7SUFDUCx5REFBSSxDQUFBO0lBQ0osMkRBQUssQ0FBQTtJQUNMLCtFQUFlLENBQUE7SUFDZixtRUFBUyxDQUFBO0lBQ1QsMkVBQWEsQ0FBQTtJQUNiLDZFQUFjLENBQUE7SUFDZCx5REFBSSxDQUFBO0lBQ0osb0VBQVMsQ0FBQTtJQUNULDBEQUFJLENBQUE7SUFDSiwwREFBSSxDQUFBO0lBQUUsOERBQU0sQ0FBQTtJQUFFLHdEQUFHLENBQUE7QUFDckIsQ0FBQyxFQWRXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFjNUI7QUFkRCxJQUFZLGlCQUFpQixHQUFqQix5QkFjWCxDQUFBO0FBRUQ7SUFTSTtRQVBRLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztJQUlqQyxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksTUFBTSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU5QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLGFBQWEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFJLGFB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QUFHLENBQUM7WUFDakMsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUNyQyxDQUFDO1lBQ0QsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDcEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDcEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1lBQ2pDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBNEI7UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0FBRUwsQ0FBQztBQTFEWSx5QkFBaUIsb0JBMEQ3QixDQUFBIiwiZmlsZSI6InV0aWwvbWFya2Rvd25Ub2tlbml6ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
