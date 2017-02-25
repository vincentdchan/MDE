"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const fn_1 = require("../util/fn");
const model_1 = require("../model");
const Collection = require("typescript-collections");
var RenderState;
(function (RenderState) {
    RenderState[RenderState["Null"] = 0] = "Null";
    RenderState[RenderState["PlainText"] = 1] = "PlainText";
    RenderState[RenderState["Colored"] = 2] = "Colored";
})(RenderState || (RenderState = {}));
class LineRenderer {
    constructor() {
        this._waiting_times = 0;
        this._tokenizer = new util_1.MarkdownTokenizer();
        this.initQueue();
        this._entries = [{
                renderState: RenderState.Null,
                tokenizeState: this._tokenizer.startState(),
                textToColor: new Collection.Queue(),
            }];
    }
    initQueue() {
        this._render_queue = new Collection.PriorityQueue((a, b) => {
            return a - b;
        });
    }
    renderLineImmdediately(num, content) {
        if (content.length > 0) {
            content = content.charAt(content.length - 1) == "\n" ? content.slice(0, content.length - 1) : content;
        }
        let previousEntry = this._entries[num - 1];
        if (previousEntry && previousEntry.tokenizeState) {
            let copyState = this._tokenizer.copyState(previousEntry.tokenizeState);
            this._entries[num].tokenizeState = copyState;
            if (this._entries[num].renderMethod) {
                let tokens;
                if (content == "") {
                    tokens = [{
                            type: util_1.MarkdownTokenType.Text,
                            text: content,
                        }];
                }
                else {
                    let lineStream = new model_1.LineStream(content);
                    tokens = this.renderLine(lineStream, copyState);
                }
                this._entries[num].renderMethod(tokens);
                this._entries[num].renderState = RenderState.Colored;
            }
            else
                throw new Error("Render method not found. Line:" + num);
        }
        else
            throw new Error("Previous doesn't exisit. Line:" + num);
    }
    addRenderQueue(num) {
        this._waiting_times++;
        setTimeout(() => {
            this._waiting_times--;
            if (this._waiting_times === 0) {
                let from = this._render_queue.dequeue();
                this.initQueue();
            }
        }, 200);
    }
    renderLineLazily(num, content) {
        if (content.length > 0) {
            content = content.charAt(content.length - 1) == "\n" ? content.slice(0, content.length - 1) : content;
        }
        let previousEntry = this._entries[num - 1];
        if (previousEntry && previousEntry.tokenizeState) {
            let copyState = this._tokenizer.copyState(previousEntry.tokenizeState);
            this._entries[num].tokenizeState = copyState;
            if (this._entries[num].renderMethod) {
                let tokens;
                switch (this._entries[num].renderState) {
                    case RenderState.Null:
                        tokens = [{
                                type: util_1.MarkdownTokenType.Text,
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
            else
                throw new Error("Render method not found. Line:" + num);
        }
        else
            throw new Error("Previous doesn't exisit. Line:" + num);
    }
    checkRenderQueue() {
        if (!this._render_queue.isEmpty()) {
            let topNumber = this._render_queue.dequeue();
            setTimeout(() => {
                let content = this._entries[topNumber].textToColor.dequeue();
                if (content !== undefined) {
                    this.renderLineImmdediately(topNumber, content);
                    this.checkRenderQueue();
                }
            }, 50);
        }
    }
    renderLine(stream, state) {
        let tokens = [];
        while (!stream.eol()) {
            stream.setCurrentTokenIndex();
            let currentType = this._tokenizer.tokenize(stream, state);
            let currentText = stream.current();
            if (currentText == "")
                throw new Error("Null text");
            let previous = fn_1.last(tokens);
            if (previous && previous.type === currentType) {
                previous.text += currentText;
            }
            else {
                tokens.push({
                    type: currentType,
                    text: currentText,
                });
            }
        }
        return tokens;
    }
    register(num, renderMethod) {
        this._entries[num] = {
            renderState: RenderState.Null,
            renderMethod: renderMethod,
            textToColor: new Collection.Queue(),
        };
    }
    ungister(num) {
        this._entries[num] = null;
    }
}
exports.LineRenderer = LineRenderer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2xpbmVSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUF5RjtBQUN6RixtQ0FBdUM7QUFDdkMsb0NBQTRDO0FBQzVDLHFEQUFvRDtBQVdwRCxJQUFLLFdBRUo7QUFGRCxXQUFLLFdBQVc7SUFDWiw2Q0FBSSxDQUFBO0lBQUUsdURBQVMsQ0FBQTtJQUFFLG1EQUFPLENBQUE7QUFDNUIsQ0FBQyxFQUZJLFdBQVcsS0FBWCxXQUFXLFFBRWY7QUFTRDtJQU9JO1FBRlEsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFHdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHdCQUFpQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQztnQkFDYixXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUk7Z0JBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDM0MsV0FBVyxFQUFFLElBQUksVUFBVSxDQUFDLEtBQUssRUFBVTthQUM5QyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sU0FBUztRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFTLENBQUMsQ0FBUyxFQUFFLENBQVM7WUFDM0UsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsc0JBQXNCLENBQUMsR0FBVyxFQUFFLE9BQWU7UUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8s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QUFNLENBQUMsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFdBQVc7aUJBQ3BCLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVcsRUFBRSxZQUF1QjtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2pCLFdBQVcsRUFBRSxXQUFXLENBQUMsSUFBSTtZQUM3QixZQUFZLEVBQUUsWUFBWTtZQUMxQixXQUFXLEVBQUUsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFVO1NBQzlDLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztDQUVKO0FBaEtELG9DQWdLQyIsImZpbGUiOiJjb250cm9sbGVyL2xpbmVSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
