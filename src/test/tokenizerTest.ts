import {MarkdownTokenizer, ITokenizer, MarkdownTokenType, MarkdownTokenizeState} from "../util"
import {IStream, LineStream} from "../model"
import * as assert from "assert"

describe("Tokenizer", () => {

    const testText1 = "word1 word2 \t word3";
    const testText2 = `# title`;
    const testText3 = `this is a **test** line.`;
    const testText4 =
    `# title

    Paragraph 1

    Paragraph 2
    `;

    describe("#StreamTest", () => {
        let stream = new LineStream(testText1);
        assert(!stream.eol(), "end of line.");
        assert(stream.sol(), "start of line.");

        assert.equal(stream.next(), "w", "first word.");

        assert(stream.skipTo(" "), "skip to space 1.");
        assert.equal(stream.peek(), " ", "skip to space 1.");

        assert(stream.eatSpace(), "eat space");
        assert.equal(stream.peek(), "w", "after eat space");

        assert(stream.match("w", false), "match 'w'.");
        assert(stream.match(/^word2/, false), "match regex:/^word2/, not consume");
        assert(stream.match(/^word2/, true), "match regex:/^word2/, consumed.");
        assert(stream.match(" "), "consumed not success");

        assert(stream.eatWhile(), "eat white");
        assert(stream.match("w"), "eat white not success");
        assert.equal(stream.eat(/^word3/), "word3", "eat word3");

        assert(stream.eol(), "end of line");
    })

});
