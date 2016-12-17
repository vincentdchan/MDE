"use strict";
const util_1 = require("../util");
const model_1 = require("../model");
function copyRenderEntry(entry) {
    return {
        state: entry.state,
        renderMethod: entry.renderMethod,
    };
}
class LineRenderer {
    constructor() {
        this._tokenizer = new util_1.MarkdownTokenizer();
        this._entries = [{
                state: this._tokenizer.startState(),
            }];
    }
    renderLineImmdediately(num, content) {
        let previousEntry = this._entries[num - 1];
        if (previousEntry && previousEntry.state) {
            let copyState = this._tokenizer.copyState(previousEntry.state);
            let lineStream = new model_1.LineStream(content);
            let tokens = this.renderLine(lineStream, copyState);
            this._entries[num].state = copyState;
            if (this._entries[num].renderMethod)
                this._entries[num].renderMethod(tokens);
            else
                throw new Error("Render method not found. Line:" + num);
        }
        throw new Error("Previous doesn't exisit.");
    }
    renderLine(stream, state) {
        let tokens = [];
        while (!stream.eol()) {
            stream.setCurrentTokenIndex();
            let currentType = this._tokenizer.tokenize(stream, state);
            let currentText = stream.current();
            if (currentText == "")
                throw new Error("Null text");
            tokens.push({
                type: currentType,
                text: currentText,
            });
        }
        return tokens;
    }
    renderLineLazy(num, content) {
        throw new Error("Not implemented.");
    }
    register(num, renderMethod) {
        this._entries[num] = {
            renderMethod: renderMethod
        };
    }
    ungister(num) {
        this._entries[num] = null;
    }
}
exports.LineRenderer = LineRenderer;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9saW5lUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUEwRSxTQUMxRSxDQUFDLENBRGtGO0FBRW5GLHdCQUFrQyxVQUVsQyxDQUFDLENBRjJDO0FBZ0I1Qyx5QkFBeUIsS0FBa0I7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1FBQ2xCLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtLQUNuQyxDQUFDO0FBQ04sQ0FBQztBQUVEO0lBS0k7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQWlCLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO2FBQ3RDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsT0FBZTtRQUMvQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUksVUFBVSxHQUFHLElBQUksa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUk7Z0JBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTyxVQUFVLENBQUMsTUFBa0IsRUFBRSxLQUE0QjtRQUMvRCxJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNSLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsV0FBVzthQUNwQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVcsRUFBRSxPQUFlO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVcsRUFBRSxZQUF1QjtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2pCLFlBQVksRUFBRSxZQUFZO1NBQzdCLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztBQUVMLENBQUM7QUExRFksb0JBQVksZUEwRHhCLENBQUEiLCJmaWxlIjoibW9kZWwvbGluZVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
