import * as Electron from "electron"
import {remote} from "electron"
import {MarkdownTokenizer, MarkdownTokenType, MarkdownTokenizeState} from "../util"
import {MarkdownToken} from "../controller"
import {last} from "../util/fn"
import {LineStream} from "../model"

function renderLine(tokenizer: MarkdownTokenizer, stream: LineStream, state: MarkdownTokenizeState) : MarkdownToken[] {
    let tokens : MarkdownToken[] = [];
    while (!stream.eol()) {
        stream.setCurrentTokenIndex();
        let currentType = tokenizer.tokenize(stream, state);
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

export function initializeMarkdownTokenizerService() {

    let tokenizer = new MarkdownTokenizer();

    Electron.ipcMain.on("tokenizeLine", (event: Electron.IpcMainEvent ,id: number, state: any, content: string) => {
        let tokens: MarkdownToken[];
        if (content == "") {
            tokens = [{
                type: MarkdownTokenType.Text,
                text: content,
            }]
        } else {
            let lineStream = new LineStream(content);
            tokens = renderLine(tokenizer, lineStream, state);
        }

        event.sender.send("tokenizeLine-reply", id, tokens, state);
    });

}
