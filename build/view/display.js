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
    const deleteBeginLineInput = document.getElementById("input-delete-begin-line");
    const deleteBeginOffsetInput = document.getElementById("input-delete-begin-offset");
    const deleteEndLineInput = document.getElementById("input-delete-end-line");
    const deleteEndOffsetInput = document.getElementById("input-delete-end-offset");
    const deleteButton = document.getElementById("button-delete");
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
    deleteButton.addEventListener("click", (e) => {
        const beginLine = parseInt(deleteBeginLineInput.value);
        const beginOffset = parseInt(deleteBeginOffsetInput.value);
        const endLine = parseInt(deleteEndLineInput.value);
        const endOffset = parseInt(deleteEndOffsetInput.value);
        let textEdit = new textModel_1.TextEdit(textModel_1.TextEditType.DeleteText, {
            begin: {
                line: beginLine,
                offset: beginOffset
            },
            end: {
                line: endLine,
                offset: endOffset
            }
        });
        console.log(textEdit);
        domGenerator_1.applyTextEditToDOM(textEdit, textModel, realDOM);
    });
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2Rpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRCQUFnRCxvQkFDaEQsQ0FBQyxDQURtRTtBQUVwRSwrQkFBMEQsdUJBQzFELENBQUMsQ0FEZ0Y7QUFPakYsTUFBTSxjQUFjLEdBQWlCO0lBQ2pDLFVBQVUsRUFBRSxFQUFFO0NBQ2pCLENBQUE7QUFFRCxpQkFBd0IsU0FBb0I7SUFFeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxzQ0FBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkMsTUFBTSxjQUFjLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyRixNQUFNLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDekYsTUFBTSxlQUFlLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RixNQUFNLFlBQVksR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVqRixNQUFNLG9CQUFvQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbEcsTUFBTSxzQkFBc0IsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3RHLE1BQU0sa0JBQWtCLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5RixNQUFNLG9CQUFvQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDbEcsTUFBTSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFM0UsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7UUFDakQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUV4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLG9CQUFRLENBQUMsd0JBQVksQ0FBQyxVQUFVLEVBQUU7WUFDakQsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsV0FBVztTQUN0QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWQsaUNBQWtCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUVGLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFhO1FBQ2pELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2RCxJQUFJLFFBQVEsR0FBRyxJQUFJLG9CQUFRLENBQUMsd0JBQVksQ0FBQyxVQUFVLEVBQUU7WUFDakQsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU0sRUFBRSxXQUFXO2FBQ3RCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxTQUFTO2FBQ3BCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixpQ0FBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQXBEZSxlQUFPLFVBb0R0QixDQUFBIiwiZmlsZSI6InZpZXcvZGlzcGxheS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
