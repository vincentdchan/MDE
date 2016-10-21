"use strict";
const token_1 = require("./token");
const stringBuffer_1 = require("../util/stringBuffer");
class Tokenizer {
}
function Tokenize(text) {
    var result = new Array();
    for (let i = 0; i < text.length; i++) {
        let charactor = text.charAt(i);
        function scanHtmlTag() {
            var buffer = new stringBuffer_1.StringBuffer();
            while (text[i] != '>') {
                buffer.push(text.charAt(i++));
            }
            buffer.push('>');
            return new token_1.Token(token_1.TokenType.HtmlTag, buffer.getStr());
        }
        switch (charactor) {
            case "#":
                result.push(new token_1.Token(token_1.TokenType.Hash));
                break;
            case '>':
                result.push(new token_1.Token(token_1.TokenType.GT));
                break;
            case '<':
                result.push(scanHtmlTag());
                break;
            case '\t':
                result.push(new token_1.Token(token_1.TokenType.Tab));
            case ' ':
                result.push(new token_1.Token(token_1.TokenType.Space));
        }
    }
    return result;
}
exports.Tokenize = Tokenize;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3Rva2VuaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3QkFBK0IsU0FDL0IsQ0FBQyxDQUR1QztBQUN4QywrQkFBMkIsc0JBRTNCLENBQUMsQ0FGZ0Q7QUFFakQ7QUFFQSxDQUFDO0FBRUQsa0JBQXlCLElBQWE7SUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQVMsQ0FBQztJQUVoQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9CO1lBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSwyQkFBWSxFQUFFLENBQUM7WUFFaEMsT0FBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLElBQUksYUFBSyxDQUFDLGlCQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxNQUFNLENBQUEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxHQUFHO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsaUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUM7WUFDVixLQUFLLEdBQUc7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxpQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQztZQUNWLEtBQUssR0FBRztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLEtBQUssQ0FBQztZQUNWLEtBQUssSUFBSTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxLQUFLLEdBQUc7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFwQ2UsZ0JBQVEsV0FvQ3ZCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci90b2tlbml6ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
