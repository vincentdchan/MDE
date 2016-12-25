"use strict";
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
})(exports.MarkdownTokenType || (exports.MarkdownTokenType = {}));
var MarkdownTokenType = exports.MarkdownTokenType;
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
            stream.skipTo("`");
            if (stream.match(/^`+/, true)) {
                state.inPre = false;
                return MarkdownTokenType.Pre;
            }
            stream.skipToEnd();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL21hcmtkb3duVG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxXQUFZLGlCQUFpQjtJQUN6QiwyREFBSyxDQUFBO0lBQ0wscURBQUUsQ0FBQTtJQUNGLGlFQUFRLENBQUE7SUFDUixpRUFBUSxDQUFBO0lBQ1IseURBQUksQ0FBQTtJQUNKLDJEQUFLLENBQUE7SUFDTCwrRUFBZSxDQUFBO0lBQ2YsMkVBQWEsQ0FBQTtJQUNiLDZFQUFjLENBQUE7SUFDZCx5REFBSSxDQUFBO0lBQ0osMERBQUksQ0FBQTtJQUNKLDBEQUFJLENBQUE7SUFBRSw4REFBTSxDQUFBO0lBQUUsd0RBQUcsQ0FBQTtJQUFFLHNFQUFVLENBQUE7SUFBRSx3RUFBVyxDQUFBO0lBQzFDLG9FQUFTLENBQUE7SUFBRSxnRUFBTyxDQUFBO0lBQUUsNEVBQWEsQ0FBQTtJQUFFLHNFQUFVLENBQUE7SUFDN0MsNEVBQWEsQ0FBQTtJQUFFLGdFQUFPLENBQUE7QUFDMUIsQ0FBQyxFQWZXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFlNUI7QUFmRCxJQUFZLGlCQUFpQixHQUFqQix5QkFlWCxDQUFBO0FBRUQ7SUFZSTtRQVZRLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBSWpDLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxNQUFNLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7UUFFL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxhQUFhLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxhQUFhLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdELElBQUksYUFBYSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3JELElBQUksYUFBYSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RCxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBSSxLQUFLLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzQyxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdEMsSUFBSSxNQUFNLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3QyxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxTQUFTLENBQUMsQ0FBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCxJQUFJLGFBQWEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLGFBQWEsQ0FBQyxDQUFVLElBQUksSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsSUFBSSxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzFDLElBQUksUUFBUSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsSUFBSSxZQUFZLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2xELElBQUksWUFBWSxDQUFDLENBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekQsSUFBSSxVQUFVLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksVUFBVSxDQUFDLENBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFeEQsQ0FBQztBQXhEWSw2QkFBcUIsd0JBd0RqQyxDQUFBO0FBR0Q7SUFFSSxVQUFVO1FBQ04sTUFBTSxDQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWUsRUFBRSxLQUE0QjtRQUVsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDeEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUNoQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVsQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUMzQixNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDbEMsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFSixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7Z0JBQzNDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDbEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDckQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNsQixDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMzQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO2dCQUN4QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN4QixNQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxDQUFDO1lBRUwsQ0FBQztZQUVELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ2xDLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1FBQ2xDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7WUFFN0MsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBRTdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1lBQ2hDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRW5CLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztnQkFDdEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO2dCQUN0QyxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZCxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO1lBQzNDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsS0FBSyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDckIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDbEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7WUFDTCxDQUFDO1lBQ0QsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDbEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUk7Z0JBQ0YsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7UUFDcEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUM7WUFDakMsQ0FBQztZQUNELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDbEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbkIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7WUFDekMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUN2QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBNEI7UUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0FBRUwsQ0FBQztBQTFKWSx5QkFBaUIsb0JBMEo3QixDQUFBIiwiZmlsZSI6InV0aWwvbWFya2Rvd25Ub2tlbml6ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
