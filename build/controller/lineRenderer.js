"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
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
function copyRenderEntry(entry) {
    return {
        renderState: entry.renderState,
        tokenizeState: entry.tokenizeState,
        renderMethod: entry.renderMethod,
    };
}
class LineRenderer {
    constructor() {
        this._tokenizer = new util_1.MarkdownTokenizer();
        this._render_queue = new Collection.PriorityQueue();
        this._entries = [{
                renderState: RenderState.Null,
                tokenizeState: this._tokenizer.startState(),
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
                if (content == "") {
                    tokens = [{
                            type: util_1.MarkdownTokenType.Text,
                            text: content,
                        }];
                    this._entries[num].renderMethod(tokens);
                }
                else {
                    switch (this._entries[num].renderState) {
                        case RenderState.Null:
                            tokens = [{
                                    type: util_1.MarkdownTokenType.Text,
                                    text: content,
                                }];
                            this._entries[num].renderMethod(tokens);
                            this._entries[num].textToColor = content;
                            this._render_queue.add(num);
                            this.checkRenderQueue();
                            break;
                        case RenderState.PlainText:
                        case RenderState.Colored:
                            this._entries[num].textToColor = content;
                            this._render_queue.add(num);
                            this.checkRenderQueue();
                            break;
                    }
                }
            }
            else
                throw new Error("Render method not found. Line:" + num);
        }
        else
            throw new Error("Previous doesn't exisit. Line:" + num);
    }
    checkRenderQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!this._render_queue.isEmpty()) {
                let topNumber = this._render_queue.peek();
                if (this._entries[topNumber - 1] && this._entries[topNumber - 1].tokenizeState) {
                    let copyState = this._tokenizer.copyState(this._entries[topNumber - 1].tokenizeState);
                    if (!this._entries[topNumber].textToColor)
                        throw new Error("fuck");
                    let result = yield util_1.Host.tokenizeLine(copyState, this._entries[topNumber].textToColor);
                    if (topNumber === this._render_queue.peek()) {
                        this._entries[topNumber].tokenizeState = result.tokenizeState;
                        this._entries[topNumber].renderMethod(result.token);
                        this._entries[topNumber].renderState = RenderState.Colored;
                        this._entries[topNumber].textToColor = null;
                        this._render_queue.dequeue();
                    }
                }
                else
                    throw new Error("previous state not exisit.");
            }
        });
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
        };
    }
    ungister(num) {
        this._entries[num] = null;
    }
}
exports.LineRenderer = LineRenderer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2xpbmVSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1QkFBZ0YsU0FDaEYsQ0FBQyxDQUR3RjtBQUN6RixxQkFBMkIsWUFDM0IsQ0FBQyxDQURzQztBQUN2Qyx3QkFBa0MsVUFDbEMsQ0FBQyxDQUQyQztBQUM1QyxNQUFZLFVBQVUsV0FBTSx3QkFFNUIsQ0FBQyxDQUZtRDtBQVdwRCxJQUFLLFdBRUo7QUFGRCxXQUFLLFdBQVc7SUFDWiw2Q0FBSSxDQUFBO0lBQUUsdURBQVMsQ0FBQTtJQUFFLG1EQUFPLENBQUE7QUFDNUIsQ0FBQyxFQUZJLFdBQVcsS0FBWCxXQUFXLFFBRWY7QUFTRCx5QkFBeUIsS0FBa0I7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO1FBQzlCLGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtRQUNsQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVk7S0FDbkMsQ0FBQztBQUNOLENBQUM7QUFFRDtJQU1JO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHdCQUFpQixFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLEVBQVUsQ0FBQztRQUU1RCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUM7Z0JBQ2IsV0FBVyxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7YUFDOUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHNCQUFzQixDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUks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QUMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQzt3QkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNqQyxDQUFDO2dCQUNMLENBQUM7Z0JBQUMsSUFBSTtvQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDekQsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVPLFVBQVUsQ0FBQyxNQUFrQixFQUFFLEtBQTRCO1FBQy9ELElBQUksTUFBTSxHQUFxQixFQUFFLENBQUM7UUFDbEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFbkMsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXBELElBQUksUUFBUSxHQUFHLFNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztZQUNqQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDUixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFdBQVc7aUJBQ3BCLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVcsRUFBRSxZQUF1QjtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2pCLFdBQVcsRUFBRSxXQUFXLENBQUMsSUFBSTtZQUM3QixZQUFZLEVBQUUsWUFBWTtTQUM3QixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7QUFFTCxDQUFDO0FBckpZLG9CQUFZLGVBcUp4QixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvbGluZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
