"use strict";
const Electron = require("electron");
const util_1 = require("../util");
const fn_1 = require("../util/fn");
const model_1 = require("../model");
function renderLine(tokenizer, stream, state) {
    let tokens = [];
    while (!stream.eol()) {
        stream.setCurrentTokenIndex();
        let currentType = tokenizer.tokenize(stream, state);
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
function initializeMarkdownTokenizerService() {
    let tokenizer = new util_1.MarkdownTokenizer();
    Electron.ipcMain.on("tokenizeLine", (event, id, state, content) => {
        let tokens;
        if (content == "") {
            tokens = [{
                    type: util_1.MarkdownTokenType.Text,
                    text: content,
                }];
        }
        else {
            let lineStream = new model_1.LineStream(content);
            tokens = renderLine(tokenizer, lineStream, state);
        }
        event.sender.send("tokenizeLine-reply", id, tokens, state);
    });
}
exports.initializeMarkdownTokenizerService = initializeMarkdownTokenizerService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvdG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLFFBQVEsV0FBTSxVQUMxQixDQUFDLENBRG1DO0FBRXBDLHVCQUEwRSxTQUMxRSxDQUFDLENBRGtGO0FBRW5GLHFCQUFtQixZQUNuQixDQUFDLENBRDhCO0FBQy9CLHdCQUF5QixVQUV6QixDQUFDLENBRmtDO0FBRW5DLG9CQUFvQixTQUE0QixFQUFFLE1BQWtCLEVBQUUsS0FBNEI7SUFDOUYsSUFBSSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBELElBQUksUUFBUSxHQUFHLFNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQ7SUFFSSxJQUFJLFNBQVMsR0FBRyxJQUFJLHdCQUFpQixFQUFFLENBQUM7SUFFeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFVLEVBQUUsS0FBVSxFQUFFLE9BQWU7UUFDdEcsSUFBSSxNQUF1QixDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sR0FBRyxDQUFDO29CQUNOLElBQUksRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO29CQUM1QixJQUFJLEVBQUUsT0FBTztpQkFDaEIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxVQUFVLEdBQUcsSUFBSSxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUM7QUFuQmUsMENBQWtDLHFDQW1CakQsQ0FBQSIsImZpbGUiOiJzZXJ2ZXIvdG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
