"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL21hcmtkb3duVG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxJQUFZLGlCQWVYO0FBZkQsV0FBWSxpQkFBaUI7SUFDekIsMkRBQUssQ0FBQTtJQUNMLHFEQUFFLENBQUE7SUFDRixpRUFBUSxDQUFBO0lBQ1IsaUVBQVEsQ0FBQTtJQUNSLHlEQUFJLENBQUE7SUFDSiwyREFBSyxDQUFBO0lBQ0wsK0VBQWUsQ0FBQTtJQUNmLDJFQUFhLENBQUE7SUFDYiw2RUFBYyxDQUFBO0lBQ2QseURBQUksQ0FBQTtJQUNKLDBEQUFJLENBQUE7SUFDSiwwREFBSSxDQUFBO0lBQUUsOERBQU0sQ0FBQTtJQUFFLHdEQUFHLENBQUE7SUFBRSxzRUFBVSxDQUFBO0lBQUUsd0VBQVcsQ0FBQTtJQUMxQyxvRUFBUyxDQUFBO0lBQUUsZ0VBQU8sQ0FBQTtJQUFFLDRFQUFhLENBQUE7SUFBRSxzRUFBVSxDQUFBO0lBQzdDLDRFQUFhLENBQUE7SUFBRSxnRUFBTyxDQUFBO0FBQzFCLENBQUMsRUFmVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQWU1QjtBQUVEO0lBWUk7UUFWUSxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDbEMsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztJQUlqQyxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksTUFBTSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsTUFBTSxD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QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBNEI7UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBRUo7QUE5SkQsOENBOEpDIiwiZmlsZSI6InV0aWwvbWFya2Rvd25Ub2tlbml6ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
