"use strict";
const textModel_1 = require("../model/textModel");
const domGenerator_1 = require("../model/domGenerator");
const DEFAULT_OPTION = {
    lineHeight: 18
};
function Display(textModel) {
    let gen = new domGenerator_1.TextModelToDOMGenerator(textModel);
    let realDOM = gen.generate();
    document.body.appendChild(realDOM);
    const beginLineInput = document.getElementById("input-begin-line");
    const beginOffsetInput = document.getElementById("input-begin-offset");
    const insertTextInput = document.getElementById("input-insert-text");
    const insertButton = document.getElementById("button-insert");
    insertButton.addEventListener("click", (e) => {
        const beginLine = parseInt(beginLineInput.value);
        const beginOffset = parseInt(beginOffsetInput.value);
        const inputText = insertTextInput.value;
        let textEdit = new textModel_1.TextEdit(textModel_1.TextEditType.InsertText, {
            line: beginLine,
            offset: beginOffset
        }, inputText);
        domGenerator_1.applyTextEditToDOM(textEdit, textModel, realDOM);
    });
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2Rpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRCQUFnRCxvQkFDaEQsQ0FBQyxDQURtRTtBQUVwRSwrQkFBMEQsdUJBQzFELENBQUMsQ0FEZ0Y7QUFPakYsTUFBTSxjQUFjLEdBQWlCO0lBQ2pDLFVBQVUsRUFBRSxFQUFFO0NBQ2pCLENBQUE7QUFFRCxpQkFBd0IsU0FBb0I7SUFFeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxzQ0FBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkMsTUFBTSxjQUFjLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyRixNQUFNLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDekYsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RixNQUFNLFlBQVksR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVqRixZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtRQUNqRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBRXhDLElBQUksUUFBUSxHQUFHLElBQUksb0JBQVEsQ0FBQyx3QkFBWSxDQUFDLFVBQVUsRUFBRTtZQUNqRCxJQUFJLEVBQUUsU0FBUztZQUNmLE1BQU0sRUFBRSxXQUFXO1NBQ3RCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFZCxpQ0FBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQztBQXpCZSxlQUFPLFVBeUJ0QixDQUFBIiwiZmlsZSI6InZpZXcvZGlzcGxheS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
