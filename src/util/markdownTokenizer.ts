import {ITokenizer} from "./tokenizer"
import {IStream} from "../model"

export enum MarkdownTokenType {
    Space,
    Hr,
    Heading1,
    Heading2,
    Code,
    Table,
    BlockquoteStart,
    ListItemStart,
    LooseItemStart,
    Html,
    Text,
    Bold, Italic, Pre, BoldItalic, HTMLComment,
    HTMLPunct, HTMLTag, HTMLAttribute, HTMLString,
    SquareBracket, Bracket,
}

export class MarkdownTokenizeState {

    private _is_start_of_line: boolean = true;
    private _in_pre: boolean = false;
    private _in_bold: boolean = false;
    private _in_html_tag: boolean = false;
    private _in_html_comment: boolean = false;
    private _parsed_html_tag: boolean = false;
    private _in_italic: boolean = false;
    private _is_blockquote: boolean = false;
    private _title_level: number = 0;

    constructor() {

    }

    copy(): MarkdownTokenizeState {
        let newObj = new MarkdownTokenizeState();

        newObj._in_bold = this._in_bold;
        newObj._in_italic = this._in_italic;
        newObj._in_pre = this._in_pre;
        newObj._in_html_comment = this._in_html_comment;
        newObj._in_html_tag = this._in_html_tag;
        newObj._parsed_html_tag = this._parsed_html_tag

        return newObj;
    }

    get isStartOfLine() { return this._is_start_of_line; }
    set isStartOfLine(v: boolean) { this._is_start_of_line = v; }

    get parsedHtmlTag() { return this._parsed_html_tag; }
    set parsedHtmlTag(v: boolean) { this._parsed_html_tag = v; }

    get inPre() { return this._in_pre; }
    set inPre(v: boolean) { this._in_pre = v; }

    get inBold() { return this._in_bold; }
    set inBold(v: boolean) { this._in_bold = v; }

    get inHtmlTag() { return this._in_html_tag; }
    set inHtmlTag(v: boolean) { this._in_html_tag = v; }

    get inHtmlComment() { return this._in_html_comment; }
    set inHtmlComment(v: boolean) { this._in_html_comment = v; }

    get inItalic() { return this._in_italic; }
    set inItalic(v: boolean) { this._in_italic = v; }

    get isBlockquote() { return this._is_blockquote; }
    set isBlockquote(v: boolean) { this._is_blockquote = v; }

    get titleLevel() { return this._title_level; }
    set titleLevel(v: number) { this._title_level = v; }

}


export class MarkdownTokenizer implements ITokenizer<MarkdownTokenizeState, MarkdownTokenType>  {

    startState(): MarkdownTokenizeState {
        return new MarkdownTokenizeState();
    }

    tokenize(stream: IStream, state: MarkdownTokenizeState): MarkdownTokenType {

        if (state.inHtmlComment) {
            let endComment = /^-->/;
            while (!stream.eol() && !stream.match(endComment, false)) {
                stream.next();
            }

            if (stream.match(endComment, true)) {
                state.inHtmlComment = false;
            }
            return MarkdownTokenType.HTMLComment;
        } else if (state.inHtmlTag) {
            stream.eatWhile();

            if (!state.parsedHtmlTag) {
                if (stream.match(/^\w+/, true)) {
                    state.parsedHtmlTag = true;
                    return MarkdownTokenType.HTMLTag;
                } else {
                    stream.skipToEnd();
                    return MarkdownTokenType.Text;
                }
            } else {

                if (stream.match(/^\w+/, true)) {
                    return MarkdownTokenType.HTMLAttribute;
                } else if (stream.match(/^=/, true)) {
                    return MarkdownTokenType.Text;
                } else if (stream.match(/^"/, false)) {
                    while (!stream.eol() && !stream.match(/^[^\\]"/, true)) {
                        stream.next();
                    }
                    if (stream.current() === "") stream.next();
                    return MarkdownTokenType.HTMLString;
                } else if (stream.match(/^>/, true)) {
                    state.inHtmlTag = false;
                    return MarkdownTokenType.HTMLPunct;
                }

            }

            stream.skipToEnd();
            return MarkdownTokenType.Text;
        }

        // escape
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
            } else if (stream.match(titleRegex, true)) {
                state.inPre = false;
                state.inBold = false;
                state.inItalic = false;
                stream.skipToEnd();

                let match = titleRegex.exec(stream.current());
                if (match[0].length === 1) {
                    return MarkdownTokenType.Heading1;
                } else {
                    return MarkdownTokenType.Heading2;
                }
            } else if (stream.match(/^-([^-]+|$)/, false)) {
                stream.next();
                return MarkdownTokenType.ListItemStart;
            } else if (stream.match(/^\+([^\+]+|$)/, false)) {
                stream.next();
                return MarkdownTokenType.ListItemStart;
            } else if (stream.match(/^\d+\./, false)) {
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
                } else {
                    stream.next();
                }
            }
            stream.skipToEnd();
            return MarkdownTokenType.Bold;
        } else if (state.inItalic) {
            if (stream.skipTo("*") || stream.skipTo("_")) {
                stream.next();
                state.inItalic = false;
            } else 
                stream.skipToEnd();
            return MarkdownTokenType.Italic;
        } else if (state.inPre) {
            while (!stream.eol()) {
                if (stream.match(/^`+/, true)) {
                    state.inPre = false;
                    return MarkdownTokenType.Pre;
                } else if (stream.match(/^"("|(\\"|[^"])*")/, true) ||
                    stream.match(/^'('|(\\'|[^'])*')/, true)) {
                    // string
                }
                stream.next();
            }
            return MarkdownTokenType.Pre;
        } else {
            if (stream.match(/^(\*\*|__)/, true)) {
                state.inBold = true;
                return MarkdownTokenType.Bold;
            } else if (stream.match(/^(\*|_)/, true)) {
                state.inItalic = true;
                return MarkdownTokenType.Italic;
            } else if (stream.match(/^`+/, true)) {
                state.inPre = true;
                return MarkdownTokenType.Pre;
            } else if (stream.match(/^<!--/, true)) {
                state.inHtmlComment = true;
                return MarkdownTokenType.HTMLComment;
            } else if (stream.match(/^<\/*/, true)) {
                state.inHtmlTag = true;
                state.parsedHtmlTag = false;
                return MarkdownTokenType.HTMLPunct;
            } else if (stream.match(/^!\[[^\]]*\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.Text;
            } else if (stream.match(/^\[[^\]]*\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.SquareBracket;
            } else if (stream.match(/^\]\([^\)]*\)/, false)) {
                stream.next();
                return MarkdownTokenType.SquareBracket;
            }
        }
        stream.next();
        return MarkdownTokenType.Text;
    }

    copyState(state: MarkdownTokenizeState): MarkdownTokenizeState {
        return state.copy();
    }

}
