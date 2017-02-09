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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvdG9rZW5pemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQ0FBb0M7QUFFcEMsa0NBQW1GO0FBRW5GLG1DQUErQjtBQUMvQixvQ0FBbUM7QUFFbkMsb0JBQW9CLFNBQTRCLEVBQUUsTUFBa0IsRUFBRSxLQUE0QjtJQUM5RixJQUFJLE1BQU0sR0FBcUIsRUFBRSxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNuQixNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5QixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEQsSUFBSSxRQUFRLEdBQUcsU0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDUixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFdBQVc7YUFDcEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRDtJQUVJLElBQUksU0FBUyxHQUFHLElBQUksd0JBQWlCLEVBQUUsQ0FBQztJQUV4QyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQVUsRUFBRSxLQUFVLEVBQUUsT0FBZTtRQUN0RyxJQUFJLE1BQXVCLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxHQUFHLENBQUM7b0JBQ04sSUFBSSxFQUFFLHdCQUFpQixDQUFDLElBQUk7b0JBQzVCLElBQUksRUFBRSxPQUFPO2lCQUNoQixDQUFDLENBQUE7UUFDTixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLFVBQVUsR0FBRyxJQUFJLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQW5CRCxnRkFtQkMiLCJmaWxlIjoic2VydmVyL3Rva2VuaXplci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
