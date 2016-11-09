"use strict";
const dom_1 = require("../util/dom");
const viewDocument_1 = require("./viewDocument");
const viewCursor_1 = require("./viewCursor");
const viewInputer_1 = require("./viewInputer");
class EditorView {
    constructor(_model) {
        this._dom = dom_1.elem("div", "mde-editor");
        this._model = _model;
        this._document = new viewDocument_1.DocumentView(_model);
        this._document.render();
        this._cursor = new viewCursor_1.CursorView();
        this._inputer = new viewInputer_1.InputerView();
        this._dom.appendChild(this._cursor.element());
        this._dom.appendChild(this._inputer.element());
        this._dom.appendChild(this._document.element());
    }
    element() {
        return this._dom;
    }
    on(name, listener, useCapture) {
        this._dom.addEventListener(name, listener);
    }
    get inputerView() {
        return this._inputer;
    }
    get documentView() {
        return this._document;
    }
    get cursorView() {
        return this._cursor;
    }
    dispose() {
        this._document.dispose();
        this._cursor.dispose();
    }
}
exports.EditorView = EditorView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFnQyxhQUNoQyxDQUFDLENBRDRDO0FBRTdDLCtCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUMzQyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUN2Qyw4QkFBMEIsZUFDMUIsQ0FBQyxDQUR3QztBQUd6QztJQVFJLFlBQVksTUFBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEVBQUUsQ0FBQyxJQUFZLEVBQUUsUUFBNEMsRUFBRSxVQUFvQjtRQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0FBRUwsQ0FBQztBQWhEWSxrQkFBVSxhQWdEdEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
