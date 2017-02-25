"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const assert = require("assert");
describe("Tokenizer", () => {
    const testText1 = "word1 word2 \t word3";
    const testText2 = `# title`;
    const testText3 = `this is a **test** line.`;
    const testText4 = `# title

    Paragraph 1

    Paragraph 2
    `;
    describe("#StreamTest", () => {
        let stream = new model_1.LineStream(testText1);
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
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L3Rva2VuaXplclRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxvQ0FBNEM7QUFDNUMsaUNBQWdDO0FBRWhDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFFbEIsTUFBTSxTQUFTLEdBQUcsc0JBQXNCLENBQUM7SUFDekMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVCLE1BQU0sU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUNmOzs7OztLQUtDLENBQUM7SUFFRixRQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVoRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXJELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdG9rZW5pemVyVGVzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
