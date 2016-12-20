"use strict";
const util_1 = require("../util");
const fn_1 = require("../util/fn");
const model_1 = require("../model");
const process = require("process");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvdG9rZW5pemVyX2NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBMEUsU0FDMUUsQ0FBQyxDQURrRjtBQUVuRixxQkFBbUIsWUFDbkIsQ0FBQyxDQUQ4QjtBQUMvQix3QkFBeUIsVUFDekIsQ0FBQyxDQURrQztBQUVuQyxNQUFZLE9BQU8sV0FBTSxTQUV6QixDQUFDLENBRmlDO0FBRWxDLG9CQUFvQixTQUE0QixFQUFFLE1BQWtCLEVBQUUsS0FBNEI7SUFDOUYsSUFBSSxNQUFNLEdBQXFCLEVBQUUsQ0FBQztJQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBELElBQUksUUFBUSxHQUFHLFNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO1FBQ2pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxXQUFXO2FBQ3BCLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLHdCQUFpQixFQUFFLENBQUM7QUFFeEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFvRTtJQUN2RixJQUFJLENBQUM7UUFFRCxNQUFNLENBQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssY0FBYztnQkFDZixJQUFJLE1BQXVCLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sR0FBRyxDQUFDOzRCQUNOLElBQUksRUFBRSx3QkFBaUIsQ0FBQyxJQUFJOzRCQUM1QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO3lCQUN6QixDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLFVBQVUsR0FBRyxJQUFJLGtCQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEQsTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELENBQUM7Z0JBRUQsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDVCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7b0JBQ2QsSUFBSSxFQUFFO3dCQUNGLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ2YsS0FBSyxFQUFFLE1BQU07d0JBQ2IsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztxQkFDaEM7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQztRQUNkLENBQUM7SUFFTCxDQUFFO0lBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InNlcnZlci90b2tlbml6ZXJfY2hpbGQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
