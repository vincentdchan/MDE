import {Host, MarkdownTokenizer, MarkdownTokenType, MarkdownTokenizeState} from "../util"
import {hd, tl, last} from "../util/fn"
import {IStream, LineStream} from "../model"
import * as Collection from "typescript-collections"

export interface MarkdownToken {
    type: MarkdownTokenType;
    text: string;
}

interface IRenderer {
    (tokens: MarkdownToken[]): void;
}

enum RenderState {
    Null, PlainText, Colored,
}

interface RenderEntry {
    renderState: RenderState;
    tokenizeState?: MarkdownTokenizeState;
    renderMethod?: IRenderer;
    textToColor: Collection.Queue<string>;
}

/*
function copyRenderEntry(entry: RenderEntry): RenderEntry {
    return {
        renderState: entry.renderState,
        tokenizeState: entry.tokenizeState,
        renderMethod: entry.renderMethod,
    };
}
*/

export class LineRenderer {

    private _tokenizer: MarkdownTokenizer;
    private _entries: RenderEntry[];
    private _render_queue: Collection.PriorityQueue<number>;

    constructor() {
        this._tokenizer = new MarkdownTokenizer();
        this._render_queue = new Collection.PriorityQueue<number>((a: number, b: number) => {
            return a - b;
        });

        this._entries = [{
            renderState: RenderState.Null,
            tokenizeState: this._tokenizer.startState(),
            textToColor: new Collection.Queue<string>(),
        }]
    }

    renderLineImmdediately(num: number, content: string) {
        if (content.length > 0) {
            content = content.charAt(content.length - 1) == "\n" ? content.slice(0, content.length - 1) : content;
        }

        let previousEntry = this._entries[num-1];
        if (previousEntry && previousEntry.tokenizeState) {
            let copyState = this._tokenizer.copyState(previousEntry.tokenizeState);
            this._entries[num].tokenizeState = copyState;
            if (this._entries[num].renderMethod) {
                let tokens: MarkdownToken[];
                if (content == "") {
                    tokens = [{
                        type: MarkdownTokenType.Text,
                        text: content,
                    }]
                } else {
                    let lineStream = new LineStream(content);
                    tokens = this.renderLine(lineStream, copyState);
                }
                this._entries[num].renderMethod(tokens);
                this._entries[num].renderState = RenderState.Colored;
            }
            else
                throw new Error("Render method not found. Line:" + num);
        } 
        else throw new Error("Previous doesn't exisit. Line:" + num);
    }

    renderLineLazily(num: number, content: string) {
        if (content.length > 0) {
            content = content.charAt(content.length - 1) == "\n" ? content.slice(0, content.length - 1) : content;
        }

        let previousEntry = this._entries[num-1];
        if (previousEntry && previousEntry.tokenizeState) {
            let copyState = this._tokenizer.copyState(previousEntry.tokenizeState);
            this._entries[num].tokenizeState = copyState;
            if (this._entries[num].renderMethod) {
                let tokens: MarkdownToken[];
                
                //
                // if the content is empty string
                // render immediately
                //
                if (content == "") {
                    tokens = [{
                        type: MarkdownTokenType.Text,
                        text: content,
                    }]
                    this._entries[num].renderMethod(tokens);
                } else {
                    switch(this._entries[num].renderState) {
                        // if this line doesn't render. then render it into plain text.
                        case RenderState.Null:
                            tokens = [{
                                type: MarkdownTokenType.Text,
                                text: content,
                            }];
                            this._entries[num].renderMethod(tokens);
                            this._entries[num].textToColor.enqueue(content);

                            this._render_queue.enqueue(num);
                            this.checkRenderQueue();
                            break;
                        case RenderState.PlainText:
                        case RenderState.Colored:
                            this._entries[num].textToColor.enqueue(content);

                            this._render_queue.enqueue(num);
                            this.checkRenderQueue();
                            break;
                    }
                }
            }
            else
                throw new Error("Render method not found. Line:" + num);
        } 
        else throw new Error("Previous doesn't exisit. Line:" + num);
    }

    private checkRenderQueue() {
        if (!this._render_queue.isEmpty()) {
            let topNumber = this._render_queue.peek();
            if (this._entries[topNumber - 1] && this._entries[topNumber - 1].tokenizeState) {
                let copyState = this._tokenizer.copyState(this._entries[topNumber - 1].tokenizeState);
                // if (!this._entries[topNumber].textToColor) throw new Error("fuck")


                setTimeout(() => {

                    let content = this._entries[topNumber].textToColor.dequeue();
                    if (content) {
                        this.renderLineImmdediately(topNumber, content);
                        this._render_queue.dequeue();
                        this.checkRenderQueue();
                    }

                }, 50);

            } else {
                throw new Error("previous state not exisit.");
            }
        }
    }

/*
    private checkRenderQueue() {
        if (!this._render_queue.isEmpty()) {
            let topNumber = this._render_queue.peek();
            if (this._entries[topNumber - 1] && this._entries[topNumber - 1].tokenizeState) {
                let copyState = this._tokenizer.copyState(this._entries[topNumber - 1].tokenizeState);
                if (!this._entries[topNumber].textToColor) throw new Error("fuck")

                Host.asyncTokenizeLine(copyState, this._entries[topNumber].textToColor, 
                (tokens: MarkdownToken[], tokenizeState: MarkdownTokenizeState) => {

                    /// check if the top of the heap is still this number
                    if (topNumber === this._render_queue.peek()) {
                        this._entries[topNumber].tokenizeState = tokenizeState;
                        this._entries[topNumber].renderMethod(tokens);
                        this._entries[topNumber].renderState = RenderState.Colored;
                        // this._entries[topNumber].textToColor = null;

                        this._render_queue.dequeue();
                        this.checkRenderQueue();
                    }

                })

            } else {
                throw new Error("previous state not exisit.");
            }
        }
    }
    */

    private renderLine(stream: LineStream, state: MarkdownTokenizeState) : MarkdownToken[] {
        let tokens : MarkdownToken[] = [];
        while (!stream.eol()) {
            stream.setCurrentTokenIndex();
            let currentType = this._tokenizer.tokenize(stream, state);
            let currentText = stream.current();
            // this line must not be a null line
            if (currentText == "") throw new Error("Null text");

            let previous = last(tokens);
            if (previous && previous.type === currentType) {
                previous.text += currentText;
            } else {
                tokens.push({
                    type: currentType,
                    text: currentText,
                });
            }
        }
        return tokens;
    }

    register(num: number, renderMethod: IRenderer) {
        this._entries[num] = {
            renderState: RenderState.Null,
            renderMethod: renderMethod,
            textToColor: new Collection.Queue<string>(),
        };
    }

    ungister(num: number) {
        this._entries[num] = null;
    }

}
