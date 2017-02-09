"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L3Rva2VuaXplclRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9DQUE0QztBQUM1QyxpQ0FBZ0M7QUFFaEMsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUVsQixNQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztJQUN6QyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUIsTUFBTSxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQ2Y7Ozs7O0tBS0MsQ0FBQztJQUVGLFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVwRCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVsRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV6RCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC90b2tlbml6ZXJUZXN0LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
