"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownTokenType;
(function (MarkdownTokenType) {
    MarkdownTokenType[MarkdownTokenType["Space"] = 0] = "Space";
    MarkdownTokenType[MarkdownTokenType["Hr"] = 1] = "Hr";
    MarkdownTokenType[MarkdownTokenType["Heading1"] = 2] = "Heading1";
    MarkdownTokenType[MarkdownTokenType["Heading2"] = 3] = "Heading2";
    MarkdownTokenType[MarkdownTokenType["Code"] = 4] = "Code";
    MarkdownTokenType[MarkdownTokenType["Table"] = 5] = "Table";
    MarkdownTokenType[MarkdownTokenType["BlockquoteStart"] = 6] = "BlockquoteStart";
    MarkdownTokenType[MarkdownTokenType["ListItemStart"] = 7] = "ListItemStart";
    MarkdownTokenType[MarkdownTokenType["LooseItemStart"] = 8] = "LooseItemStart";
    MarkdownTokenType[MarkdownTokenType["Html"] = 9] = "Html";
    MarkdownTokenType[MarkdownTokenType["Text"] = 10] = "Text";
    MarkdownTokenType[MarkdownTokenType["Bold"] = 11] = "Bold";
    MarkdownTokenType[MarkdownTokenType["Italic"] = 12] = "Italic";
    MarkdownTokenType[MarkdownTokenType["Pre"] = 13] = "Pre";
    MarkdownTokenType[MarkdownTokenType["BoldItalic"] = 14] = "BoldItalic";
    MarkdownTokenType[MarkdownTokenType["HTMLComment"] = 15] = "HTMLComment";
    MarkdownTokenType[MarkdownTokenType["HTMLPunct"] = 16] = "HTMLPunct";
    MarkdownTokenType[MarkdownTokenType["HTMLTag"] = 17] = "HTMLTag";
    MarkdownTokenType[MarkdownTokenType["HTMLAttribute"] = 18] = "HTMLAttribute";
    MarkdownTokenType[MarkdownTokenType["HTMLString"] = 19] = "HTMLString";
    MarkdownTokenType[MarkdownTokenType["SquareBracket"] = 20] = "SquareBracket";
    MarkdownTokenType[MarkdownTokenType["Bracket"] = 21] = "Bracket";
})(MarkdownTokenType = exports.MarkdownTokenType || (exports.MarkdownTokenType = {}));
class MarkdownTokenizeState {
    constructor() {
        this._is_start_of_line = true;
        this._in_pre = false;
        this._in_bold = false;
        this._in_html_tag = false;
        this._in_html_comment = false;
        this._parsed_html_tag = false;
        this._in_italic = false;
        this._is_blockquote = false;
        this._title_level = 0;
    }
    copy() {
        let newObj = new MarkdownTokenizeState();
        newObj._in_bold = this._in_bold;
        newObj._in_italic = this._in_italic;
        newObj._in_pre = this._in_pre;
        newObj._in_html_comment = this._in_html_comment;
        newObj._in_html_tag = this._in_html_tag;
        newObj._parsed_html_tag = this._parsed_html_tag;
        return newObj;
    }
    get isStartOfLine() { return this._is_start_of_line; }
    set isStartOfLine(v) { this._is_start_of_line = v; }
    get parsedHtmlTag() { return this._parsed_html_tag; }
    set parsedHtmlTag(v) { this._parsed_html_tag = v; }
    get inPre() { return this._in_pre; }
    set inPre(v) { this._in_pre = v; }
    get inBold() { return this._in_bold; }
    set inBold(v) { this._in_bold = v; }
    get inHtmlTag() { return this._in_html_tag; }
    set inHtmlTag(v) { this._in_html_tag = v; }
    get inHtmlComment() { return this._in_html_comment; }
    set inHtmlComment(v) { this._in_html_comment = v; }
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
        if (state.inHtmlComment) {
            let endComment = /^-->/;
            while (!stream.eol() && !stream.match(endComment, false)) {
                stream.next();
            }
            if (stream.match(endComment, true)) {
                state.inHtmlComment = false;
            }
            return MarkdownTokenType.HTMLComment;
        }
        else if (state.inHtmlTag) {
            stream.eatWhile();
            if (!state.parsedHtmlTag) {
                if (stream.match(/^\w+/, true)) {
                    state.parsedHtmlTag = true;
                    return MarkdownTokenType.HTMLTag;
                }
                else {
                    stream.skipToEnd();
                    return MarkdownTokenType.Text;
                }
            }
            else {
                if (stream.match(/^\w+/, true)) {
                    return MarkdownTokenType.HTMLAttribute;
                }
                else if (stream.match(/^=/, true)) {
                    return MarkdownTokenType.Text;
                }
                else if (stream.match(/^"/, false)) {
                    while (!stream.eol() && !stream.match(/^[^\\]"/, true)) {
                        stream.next();
                    }
                    if (stream.current() === "")
                        stream.next();
                    return MarkdownTokenType.HTMLString;
                }
                else if (stream.match(/^>/, true)) {
                    state.inHtmlTag = false;
                    return MarkdownTokenType.HTMLPunct;
                }
            }
            stream.skipToEnd();
            return MarkdownTokenType.Text;
        }
        if (stream.match(/^\\(\\|`|\*|_|\{|\}|\[|\]|\(|\)|#|\+|-|.|!)/, true)) {
            return MarkdownTokenType.Text;
        }
        if (state.isStartOfLine) {
            stream.eatWhile();
            if (stream.match(/^>/, true))
                return MarkdownTokenType.BlockquoteStart;
            let titleRegex = /^(#{1,6})/;
            if (stream.match(/^( *[-*_]){3,}/, true)) {
                return MarkdownTokenType.Hr;
            }
            else if (stream.match(titleRegex, true)) {
                state.inPre = false;
                state.inBold = false;
                state.inItalic = false;
                stream.skipToEnd();
                let match = titleRegex.exec(stream.current());
                if (match[0].length === 1) {
                    return MarkdownTokenType.Heading1;
                }
                else {
                    return MarkdownTokenType.Heading2;
                }
            }
            else if (stream.match(/^-([^-]+|$)/, false)) {
                stream.next();
                return MarkdownTokenType.ListItemStart;
            }
            else if (stream.match(/^\+([^\+]+|$)/, false)) {
                stream.next();
                return MarkdownTokenType.ListItemStart;
            }
            else if (stream.match(/^\d+\./, false)) {
                stream.eat(/^\d+/);
                return MarkdownTokenType.ListItemStart;
            }
            state.isStartOfLine = false;
        }
        if (state.inBold) {
            while (stream.skipTo("*") || stream.skipTo("_")) {
                if (stream.match(/^(\*\*|__)/, true)) {
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
            if (stream.skipTo("*") || stream.skipTo("_")) {
                stream.next();
                state.inItalic = false;
            }
            else
                stream.skipToEnd();
            return MarkdownTokenType.Italic;
        }
        else if (state.inPre) {
            while (!stream.eol()) {
                if (stream.match(/^`+/, true)) {
                    state.inPre = false;
                    return MarkdownTokenType.Pre;
                }
                else if (stream.match(/^"("|(\\"|[^"])*")/, true) ||
                    stream.match(/^'('|(\\'|[^'])*')/, true)) {
                }
                stream.next();
            }
            return MarkdownTokenType.Pre;
        }
        else {
            if (stream.match(/^(\*\*|__)/, true)) {
                state.inBold = true;
                return MarkdownTokenType.Bold;
            }
            else if (stream.match(/^(\*|_)/, true)) {
                state.inItalic = true;
                return MarkdownTokenType.Italic;
            }
            else if (stream.match(/^`+/, true)) {
                state.inPre = true;
                return MarkdownTokenType.Pre;
            }
            else if (stream.match(/^<!--/, true)) {
                state.inHtmlComment = true;
                return MarkdownTokenType.HTMLComment;
            }
            else if (stream.match(/^<\/*/, true)) {
                state.inHtmlTag = true;
                state.parsedHtmlTag = false;
                return MarkdownTokenType.HTMLPunct;
            }
            else if (stream.match(/^!\[[^\]]*\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.Text;
            }
            else if (stream.match(/^\[[^\]]*\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.SquareBracket;
            }
            else if (stream.match(/^\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.SquareBracket;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL21hcmtkb3duVG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBWSxpQkFlWDtBQWZELFdBQVksaUJBQWlCO0lBQ3pCLDJEQUFLLENBQUE7SUFDTCxxREFBRSxDQUFBO0lBQ0YsaUVBQVEsQ0FBQTtJQUNSLGlFQUFRLENBQUE7SUFDUix5REFBSSxDQUFBO0lBQ0osMkRBQUssQ0FBQTtJQUNMLCtFQUFlLENBQUE7SUFDZiwyRUFBYSxDQUFBO0lBQ2IsNkVBQWMsQ0FBQTtJQUNkLHlEQUFJLENBQUE7SUFDSiwwREFBSSxDQUFBO0lBQ0osMERBQUksQ0FBQTtJQUFFLDhEQUFNLENBQUE7SUFBRSx3REFBRyxDQUFBO0lBQUUsc0VBQVUsQ0FBQTtJQUFFLHdFQUFXLENBQUE7SUFDMUMsb0VBQVMsQ0FBQTtJQUFFLGdFQUFPLENBQUE7SUFBRSw0RUFBYSxDQUFBO0lBQUUsc0VBQVUsQ0FBQTtJQUM3Qyw0RUFBYSxDQUFBO0lBQUUsZ0VBQU8sQ0FBQTtBQUMxQixDQUFDLEVBZlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFlNUI7QUFFRDtJQVlJO1FBVlEsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsaUJBQVksR0FBVyxDQUFDLENBQUM7SUFJakMsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLE1BQU0sR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7UUFFekMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0s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bEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZCxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQTRCO1FBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUVKO0FBOUpELDhDQThKQyIsImZpbGUiOiJ1dGlsL21hcmtkb3duVG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
