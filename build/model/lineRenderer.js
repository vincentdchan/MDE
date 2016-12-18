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
                            break;
                    }
                    let lineStream = new model_1.LineStream(content);
                    tokens = this.renderLine(lineStream, copyState);
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
                    let result = yield util_1.Host.tokenizeLine(copyState, this._entries[topNumber].textToColor);
                    if (topNumber === this._render_queue.peek()) {
                        this._entries[topNumber].tokenizeState = result.tokenizeState;
                        this._entries[topNumber].renderMethod(result.token);
                        this._entries[topNumber].renderState = RenderState.Colored;
                        this._entries[topNumber].textToColor = null;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9saW5lUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsdUJBQWdGLFNBQ2hGLENBQUMsQ0FEd0Y7QUFDekYscUJBQTJCLFlBQzNCLENBQUMsQ0FEc0M7QUFDdkMsd0JBQWtDLFVBQ2xDLENBQUMsQ0FEMkM7QUFDNUMsTUFBWSxVQUFVLFdBQU0sd0JBRTVCLENBQUMsQ0FGbUQ7QUFXcEQsSUFBSyxXQUVKO0FBRkQsV0FBSyxXQUFXO0lBQ1osNkNBQUksQ0FBQTtJQUFFLHVEQUFTLENBQUE7SUFBRSxtREFBTyxDQUFBO0FBQzVCLENBQUMsRUFGSSxXQUFXLEtBQVgsV0FBVyxRQUVmO0FBU0QseUJBQXlCLEtBQWtCO0lBQ3ZDLE1BQU0sQ0FBQztRQUNILFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztRQUM5QixhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWE7UUFDbEMsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO0tBQ25DLENBQUM7QUFDTixDQUFDO0FBRUQ7SUFNSTtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx3QkFBaUIsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsYUFBYSxFQUFVLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUNiLFdBQVcsRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO2FBQzlDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsT0FBZTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcs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O3dCQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJO29CQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRU8sVUFBVSxDQUFDLE1BQWtCLEVBQUUsS0FBNEI7UUFDL0QsSUFBSSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztRQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDbkIsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFELElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFcEQsSUFBSSxRQUFRLEdBQUcsU0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNSLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsV0FBVztpQkFDcEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLFlBQXVCO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFDakIsV0FBVyxFQUFFLFdBQVcsQ0FBQyxJQUFJO1lBQzdCLFlBQVksRUFBRSxZQUFZO1NBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztBQUVMLENBQUM7QUFwSlksb0JBQVksZUFvSnhCLENBQUEiLCJmaWxlIjoibW9kZWwvbGluZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
