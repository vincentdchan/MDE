import {MarkdownTokenizer, MarkdownTokenType, MarkdownTokenizeState} from "../util"
import {MarkdownToken} from "../controller"
import {last} from "../util/fn"
import {LineStream} from "../model"
import * as Electron from "electron"
import * as process from "process"

function renderLine(tokenizer: MarkdownTokenizer, stream: LineStream, state: MarkdownTokenizeState) : MarkdownToken[] {
    let tokens : MarkdownToken[] = [];
    while (!stream.eol()) {
        stream.setCurrentTokenIndex();
        console.log(state);
        console.log(state.inBold);
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
    console.log(tokens);
    return tokens;
}

let tokenizer = new MarkdownTokenizer();

process.on("message", (msg: {type: string, data: {id: number, state: any, content: string}}) => {
    try {

        switch(msg.type) {
            case "tokenizeLine":
                let tokens: MarkdownToken[];
                if (msg.data.content == "") {
                    tokens = [{
                        type: MarkdownTokenType.Text,
                        text: msg.data.content,
                    }]
                } else {
                    let lineStream = new LineStream(msg.data.content);
                    tokens = renderLine(tokenizer, lineStream, msg.data.state);
                }

                process.send({
                    type: msg.type,
                    data: {
                        id: msg.data.id,
                        token: tokens,
                        tokenizeState: msg.data.state
                    }
                });
                break;
        }

    } catch(e) {
        console.log(e);
    }

});

process.on('SIGHUP', () => {
  console.log('Got SIGHUP signal.');
});
