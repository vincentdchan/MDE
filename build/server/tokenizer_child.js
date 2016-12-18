"use strict";
const util_1 = require("../util");
const fn_1 = require("../util/fn");
const model_1 = require("../model");
const process = require("process");
function renderLine(tokenizer, stream, state) {
    let tokens = [];
    while (!stream.eol()) {
        stream.setCurrentTokenIndex();
        console.log(state);
        console.log(state.inBold);
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
    console.log(tokens);
    return tokens;
}
let tokenizer = new util_1.MarkdownTokenizer();
process.on("message", (msg) => {
    try {
        switch (msg.type) {
            case "tokenizeLine":
                let tokens;
                if (msg.data.content == "") {
                    tokens = [{
                            type: util_1.MarkdownTokenType.Text,
                            text: msg.data.content,
                        }];
                }
                else {
                    let lineStream = new model_1.LineStream(msg.data.content);
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
    }
    catch (e) {
        console.log(e);
    }
});
process.on('SIGHUP', () => {
    console.log('Got SIGHUP signal.');
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvdG9rZW5pemVyX2NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBMEUsU0FDMUUsQ0FBQyxDQURrRjtBQUVuRixxQkFBbUIsWUFDbkIsQ0FBQyxDQUQ4QjtBQUMvQix3QkFBeUIsVUFDekIsQ0FBQyxDQURrQztBQUVuQyxNQUFZLE9BQU8sV0FBTSxTQUV6QixDQUFDLENBRmlDO0FBRWxDLG9CQUFvQixTQUE0QixFQUFFLE1BQWtCLEVBQUUsS0FBNEI7SUFDOUYsSUFBSSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEQsSUFBSSxRQUFRLEdBQUcsU0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDUixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFdBQVc7YUFDcEIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELElBQUksU0FBUyxHQUFHLElBQUksd0JBQWlCLEVBQUUsQ0FBQztBQUV4QyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQW9FO0lBQ3ZGLElBQUksQ0FBQztRQUVELE1BQU0sQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxjQUFjO2dCQUNmLElBQUksTUFBdUIsQ0FBQztnQkFDNUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekIsTUFBTSxHQUFHLENBQUM7NEJBQ04sSUFBSSxFQUFFLHdCQUFpQixDQUFDLElBQUk7NEJBQzVCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87eUJBQ3pCLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksVUFBVSxHQUFHLElBQUksa0JBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNsRCxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFFRCxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNULElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtvQkFDZCxJQUFJLEVBQUU7d0JBQ0YsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDZixLQUFLLEVBQUUsTUFBTTt3QkFDYixhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO3FCQUNoQztpQkFDSixDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUVMLENBQUU7SUFBQSxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoic2VydmVyL3Rva2VuaXplcl9jaGlsZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
