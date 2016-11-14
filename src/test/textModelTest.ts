import {TextModel, LineModel} from "../model"
import assert = require("assert");

// total 8 lines
const testText1 = 
`# Title

paragraph 1
something else

- first line
- second line
- third line`

const multilinesText =
`multilinesText
total 3 lines
last line.`

let testLines1 = testText1.split("\n");
assert.equal(testLines1.length, 8);


console.log("Intialize testing...");
(() => {
    let tm1 = new TextModel(testText1);

    assert(tm1.linesCount === 8);

    tm1.forEach((line: LineModel) => {
        let lineText : string = testLines1[line.number - 1];

        if (line.number != tm1.linesCount)
            lineText += "\n";
        assert(lineText == line.text, 
            "The line " + line.number + '"' + lineText + '" should equal to ' +
            '"' + line.text + '"');;
    });

})();

console.log("Testing Position & CharAt API");
(() => {

    let tm1 = new TextModel(testText1);

    for (let i = 0; i < testText1.length; i++) {
        assert.equal(tm1.charAt(tm1.positionAt(i)), testText1.charAt(i));
        assert.equal(tm1.offsetAt(tm1.positionAt(i)), i);
    }

})();

console.log("Report testing...");
(() => {

    let tm1 = new TextModel(testText1);
    let reportText = tm1.reportAll();
    assert(testText1 == reportText, 
    "Report all should equal to the source");

    let firstLine = tm1.report({
        begin: {
            line: 1,
            offset: 0,
        },
        end: {
            line: 1,
            offset: 7,
        },
    })
    assert(tm1.lineAt(1).text == firstLine + '\n');

    let thatLines = tm1.report({
        begin: {
            line: 1,
            offset: 0,
        },
        end: {
            line:3,
            offset: 1,
        }
    });
    // suppose to
    assert("# Title\n\np");

})();


/// add text at the beginning of document
/// add text at the random line of document
/// add text at out of range and check the Error
/// add text add the end of document
console.log("Inserting testing...");
(() => {
    // Insert at the beginning of document
    let tm1 = new TextModel(testText1);
    tm1.insertText({line: 1, offset: 0}, "(insert)");
    assert(tm1.lineAt(1).text == "(insert)# Title\n");

    // Insert at the end of firstLine
    tm1.insertText({line: 1, offset: 15}, "(insert)");
    assert(tm1.lineAt(1).text == "(insert)# Title(insert)\n");

    // check out of range error.
    tm1 = new TextModel(testText1);
    assert.throws(() => {
        tm1.insertText({line: 0, offset: 0}, "(insert)");
    }, Error);

    assert.throws(() => {
        tm1.insertText({line: tm1.linesCount + 1, offset: 0}, "insert");
    }, Error);

    assert.throws(() => {
        tm1.insertText({line: 0, offset: tm1.lineAt(1).length}, "insert");
    }, Error);

    // insert linebreak
    tm1 = new TextModel(testText1);
    tm1.insertText({line: 4, offset: 9}, "\n");
    assert(tm1.linesCount === 9);
    assert(tm1.lineAt(4).text == "something\n");
    assert(tm1.lineAt(5).text == " else\n");
    assert(tm1.lineAt(6).text == "\n");
    assert(tm1.lineAt(7).text == "- first line\n");
    assert(tm1.lineAt(8).text == "- second line\n");
    assert(tm1.lineAt(9).text == "- third line");

    tm1 = new TextModel(testText1);
    tm1.insertText({line: 4, offset: 9}, multilinesText);
    assert(tm1.linesCount === 10);
    assert(tm1.lineAt(4).text == "somethingmultilinesText\n");
    assert(tm1.lineAt(5).text == "total 3 lines\n");
    assert(tm1.lineAt(6).text == "last line. else\n");

    // insert at the end of document
    tm1 = new TextModel(testText1);
    tm1.insertText(tm1.positionAt(testText1.length - 1), "(insert)");
    assert(/(insert)/.test(tm1.lineAt(tm1.linesCount).text));

})();

console.log("Delect text testing...");
(() => {
    let tm1 = new TextModel(testText1);

    // delete word int first line
    tm1.deleteText({
        begin: {line: 4, offset: 4}, 
        end: {line: 4, offset: 9}
    });

    assert(tm1.lineAt(4).text == "some else\n")

})();

console.log("All test done.");
