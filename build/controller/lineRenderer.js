"use strict";
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
        this._tokenizer = new util_1.MarkdownTokenizer();
        this._render_queue = new Collection.PriorityQueue((a, b) => {
            return a - b;
        });
        this._entries = [{
                renderState: RenderState.Null,
                tokenizeState: this._tokenizer.startState(),
                textToColor: new Collection.Queue(),
            }];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2xpbmVSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQWdGLFNBQ2hGLENBQUMsQ0FEd0Y7QUFDekYscUJBQTJCLFlBQzNCLENBQUMsQ0FEc0M7QUFDdkMsd0JBQWtDLFVBQ2xDLENBQUMsQ0FEMkM7QUFDNUMsTUFBWSxVQUFVLFdBQU0sd0JBRTVCLENBQUMsQ0FGbUQ7QUFXcEQsSUFBSyxXQUVKO0FBRkQsV0FBSyxXQUFXO0lBQ1osNkNBQUksQ0FBQTtJQUFFLHVEQUFTLENBQUE7SUFBRSxtREFBTyxDQUFBO0FBQzVCLENBQUMsRUFGSSxXQUFXLEtBQVgsV0FBVyxRQUVmO0FBbUJEO0lBTUk7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQWlCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTO1lBQzNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLFdBQVcsRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO2dCQUMzQyxXQUFXLEVBQUUsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFVO2FBQzlDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsT0FBZTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxD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Q0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0QsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRWhELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO1lBRUwsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVgsQ0FBQztJQUNMLENBQUM7SUFpQ08sVUFBVSxDQUFDLE1BQWtCLEVBQUUsS0FBNEI7UUFDL0QsSUFBSSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztRQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDbkIsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFcEQsSUFBSSxRQUFRLEdBQUcsU0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsV0FBVztpQkFDcEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLFlBQXVCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFDakIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxJQUFJO1lBQzdCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFdBQVcsRUFBRSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQVU7U0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVztRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0FBRUwsQ0FBQztBQTNLWSxvQkFBWSxlQTJLeEIsQ0FBQSIsImZpbGUiOiJjb250cm9sbGVyL2xpbmVSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
