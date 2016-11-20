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
        this._inputer.on("focus", this.handleInputerFocused.bind(this));
        this._inputer.on("blur", this.handleInputerBlur.bind(this));
    }
    handleInputerFocused(evt) {
        this._cursor.excite();
    }
    handleInputerBlur(evt) {
        this._cursor.setOff();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFnQyxhQUNoQyxDQUFDLENBRDRDO0FBRTdDLCtCQUEyQixnQkFDM0IsQ0FBQyxDQUQwQztBQUMzQyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUN2Qyw4QkFBMEIsZUFDMUIsQ0FBQyxDQUR3QztBQUd6QztJQVFJLFlBQVksTUFBaUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sb0JBQW9CLENBQUMsR0FBZ0I7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBZ0I7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxFQUFFLENBQUMsSUFBWSxFQUFFLFFBQTRDLEVBQUUsVUFBb0I7UUFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztBQUVMLENBQUM7QUEzRFksa0JBQVUsYUEyRHRCLENBQUEiLCJmaWxlIjoidmlldy92aWV3RWRpdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
