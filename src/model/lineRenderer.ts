import {MarkdownTokenizer, MarkdownTokenType, MarkdownTokenizeState} from "../util"
import {hd, tl, last} from "../util/fn"
import {IStream, LineStream} from "../model"

export interface MarkdownToken {
    type: MarkdownTokenType;
    text: string;
}

interface IRenderer {
    (tokens: MarkdownToken[]): void;
}

interface RenderEntry {
    state?: MarkdownTokenizeState;
    renderMethod?: IRenderer;
}

function copyRenderEntry(entry: RenderEntry): RenderEntry {
    return {
        state: entry.state,
        renderMethod: entry.renderMethod,
    };
}

export class LineRenderer {

    private _tokenizer: MarkdownTokenizer;
    private _entries: RenderEntry[];

    constructor() {
        this._tokenizer = new MarkdownTokenizer();

        this._entries = [{
            state: this._tokenizer.startState(),
        }]
    }

    renderLineImmdediately(num: number, content: string) {
        let previousEntry = this._entries[num-1];
        if (previousEntry && previousEntry.state) {
            let copyState = this._tokenizer.copyState(previousEntry.state);
            let lineStream = new LineStream(content);

            let tokens = this.renderLine(lineStream, copyState);
            this._entries[num].state = copyState;
            if (this._entries[num].renderMethod)
                this._entries[num].renderMethod(tokens);
            else
                throw new Error("Render method not found. Line:" + num);
        }
        throw new Error("Previous doesn't exisit.");
    }

    private renderLine(stream: LineStream, state: MarkdownTokenizeState) : MarkdownToken[] {
        let tokens : MarkdownToken[] = [];
        while (!stream.eol()) {
            stream.setCurrentTokenIndex();
            let currentType = this._tokenizer.tokenize(stream, state);
            let currentText = stream.current();
            if (currentText == "") throw new Error("Null text");
            tokens.push({
                type: currentType,
                text: currentText,
            });
        }
        return tokens;
    }

    renderLineLazy(num: number, content: string) {
        throw new Error("Not implemented.");
    }

    register(num: number, renderMethod: IRenderer) {
        this._entries[num] = {
            renderMethod: renderMethod
        };
    }

    ungister(num: number) {
        this._entries[num] = null;
    }

}
