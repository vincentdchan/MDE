import {Token, TokenType} from "./token"
import {StringBuffer} from "../util/stringBuffer"

class Tokenizer {

}

export function Tokenize(text : string) : Array<Token> {
    var result = new Array<Token>();

    for (let i = 0; i < text.length; i++) {
        let charactor = text.charAt(i);

        function scanHtmlTag() : Token {
            var buffer = new StringBuffer();

            while(text[i] != '>') {
                buffer.push(text.charAt(i++));
            }

            buffer.push('>');

            return new Token(TokenType.HtmlTag, buffer.getStr());
        }

        switch(charactor) {
            case "#":
                result.push(new Token(TokenType.Hash));
                break;
            case '>':
                result.push(new Token(TokenType.GT));
                break;
            case '<':
                result.push(scanHtmlTag());
                break;
            case '\t':
                result.push(new Token(TokenType.Tab));
            case ' ':
                result.push(new Token(TokenType.Space));
        }
    }

    return result;
}
