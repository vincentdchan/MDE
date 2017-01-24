import {LineModel} from "../model"
import * as assert from "assert"

describe("LineModel", () => {
    TestLine(0, "Hello\n");
    TestLine(1, "Are you ok?")
});

function TestLine(num: number, str: string) {

    console.log("Testing basic APi...");
    (() => {
        let lm = new LineModel(num, str);

        for (let i = 0; i < str.length; i++) {
            assert(str.charAt(i) == lm.charAt(i));
        }

        assert.equal(str.length, lm.length);
        assert(lm.firstChar == str[0]);
        assert(lm.lastChar == str[str.length - 1]);

    })();

    console.log("Testing insert...");
    (() => {
        const INSERT = "(insert)";
        let lm = new LineModel(num, str);

        if (str.charAt(str.length - 1) == '\n') {
            assert.throws(() => {
                lm.insert(lm.length, "anything");
            }, Error);
        } else {
            lm.insert(lm.length, INSERT);
            assert(lm.text == str + INSERT);
        }

        lm = new LineModel(num, str);
        lm.insert(0, INSERT);
        assert(lm.text == INSERT + str);
    })();

    if (str.charAt(str.length - 1) != '\n') {
        console.log("Testing append...");
        (() => {
            const APPEND = "(append)";
            let lm = new LineModel(num, str);

            lm.append(APPEND);

            assert(lm.text == str + APPEND);
        })();
    }

    console.log("Testing delete...");
    (() => {
        let lm = new LineModel(num, str);
        if (str.charAt(str.length - 1) == '\n') {
            assert.throws(() => {
                lm.delete(0, str.length);
            }, Error);
        } else {
            lm.delete(0, str.length);
            assert(lm.length === 0);
        }
    })();

    console.log("All test done.");

}
