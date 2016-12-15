
export class MarkdownLineState {

    private _is_bold: boolean = false;
    private _is_italic: boolean = false;
    private _is_blockquote: boolean = false;
    private _title_level: number = 0;

    constructor() {

    }

    copy() {
        let newObj = new MarkdownLineState();

        newObj.isBold = this._is_bold;
    }

    get isBold() { return this._is_bold; }
    set isBold(v: boolean) { this._is_bold = v; }

    get isItalic() { return this._is_italic; }
    set isItalic(v: boolean) { this._is_italic = v; }

    get isBlockquote() { return this._is_blockquote; }
    set isBlockquote(v: boolean) { this._is_blockquote = v; }

    get titleLevel() { return this._title_level; }
    set titleLevel(v: number) { this._title_level = v; }

}

export enum WordType {
    Normal, Bold, Italic, HeadingStart,
}

export enum LineType {
    H1, H2, H3, Blockquote
}

export interface IWord {
    wordType: WordType;
    text: string;
}

export interface ILine {
    lineType: LineType;
    words: IWord[];
}

export class LineStateUpdateEvent extends Event {

    private _line: ILine;

    constructor(line: ILine) {
        super("lineStateUpdate");

        this._line = line;
    }

    get line() {
        return this._line;
    }

}

interface LineStateUpdateListener {
    (evt: LineStateUpdateEvent): void;
}

interface lineEntry {
    content: string;
    state: MarkdownLineState;
    callback: LineStateUpdateListener
}

export class LineStateManager {

    private _array: lineEntry[] = [];

    constructor() {
    }

    register(num: number, content: string, callback: LineStateUpdateListener) {
        let state = new MarkdownLineState();
        this._array[num] = {
            content: content,
            state: state,
            callback: callback
        };
    }

    unregister(num: number) {
        this._array[num] = null;
    }

}
