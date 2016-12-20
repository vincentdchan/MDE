import {ITokenizer} from "./tokenizer"
import {IStream} from "../model"

export enum MarkdownTokenType {
    Space,
    Hr,
    Heading1,
    Heading2,
    Heading3,
    Code,
    Table,
    BlockquoteStart,
    ListStart,
    ListItemStart,
    LooseItemStart,
    Html,
    Paragraph,
    Text,
    Bold, Italic, Pre,
}

export class MarkdownTokenizeState {

    private _is_start_of_line: boolean = true;
    private _in_pre: boolean = false;
    private _in_bold: boolean = false;
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

        return newObj;
    }

    get isStartOfLine() { return this._is_start_of_line; }
    set isStartOfLine(v: boolean) { this._is_start_of_line = v; }

    get inPre() { return this._in_pre; }
    set inPre(v: boolean) { this._in_pre = v; }

    get inBold() { return this._in_bold; }
    set inBold(v: boolean) { this._in_bold = v; }

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
        if (state.isStartOfLine) {
            stream.eatWhile();
            if (stream.match(/^###/, true)) {
                state.inPre = false;
                state.inBold = false;
                state.inItalic = false;
                stream.skipToEnd();
                return MarkdownTokenType.Heading3;
            } else if (stream.match(/^##/, true)) {
                state.inPre = false;
                state.inBold = false;
                state.inItalic = false;
                stream.skipToEnd();
                return MarkdownTokenType.Heading2;
            } else if (stream.match(/^#/, true)) {
                state.inPre = false;
                state.inBold = false;
                state.inItalic = false;
                stream.skipToEnd();
                return MarkdownTokenType.Heading1;
            } else if (stream.match(/^-([^-]+|$)/, false)) {
                stream.next();
                return MarkdownTokenType.ListItemStart;
            } else if (stream.match(/^>/, true)) {
                return MarkdownTokenType.BlockquoteStart;
            } else if (stream.match(/^\d+\./, false)) {
                stream.eat(/^\d+/);
                return MarkdownTokenType.ListItemStart;
            }
            state.isStartOfLine = false;
        } 

        if (state.inBold) {
            while (stream.skipTo("*")) {
                if (stream.match(/\*\*/, true)) {
                    state.inBold = false;
                    return MarkdownTokenType.Bold;
                } else {
                    stream.next();
                }
            }
            stream.skipToEnd();
            return MarkdownTokenType.Bold;
        } else if (state.inItalic) {
            if (stream.skipTo("*")) {
                stream.next();
                state.inItalic = false;
            } else 
                stream.skipToEnd();
            return MarkdownTokenType.Italic;
        } else if (state.inPre) {
            stream.skipTo("`");
            if (stream.match(/^`+/, true)) {
                state.inPre = false;
                return MarkdownTokenType.Pre;
            }
            stream.skipToEnd();
            return MarkdownTokenType.Pre;
        } else {
            if (stream.match(/^\*\*/, true)) {
                state.inBold = true;
                return MarkdownTokenType.Bold;
            } else if (stream.match(/^\*/, true)) {
                state.inItalic = true;
                return MarkdownTokenType.Italic;
            } else if (stream.match(/^`+/, true)) {
                state.inPre = true;
                return MarkdownTokenType.Pre;
            }
        }
        stream.next();
        return MarkdownTokenType.Text;
    }

    copyState(state: MarkdownTokenizeState): MarkdownTokenizeState {
        return state.copy();
    }

}
