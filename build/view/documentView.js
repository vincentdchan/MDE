"use strict";
const lineView_1 = require("./lineView");
const dom_1 = require("../util/dom");
class VirtualDocument {
    constructor(_model) {
        this._dom = null;
        this._lines = [];
        this._model;
    }
    render() {
        this.dispose();
        this._dom = dom_1.elem("div", "editor-document");
        this._model.forEach((line) => {
            var vl = new lineView_1.LineView(line.number);
            this._lines[line.number] = vl;
            this._dom.appendChild(vl.render());
        });
        return this._dom;
    }
    refreshLine(index) {
    }
    dispose() {
        if (this._dom) {
            this._dom.parentNode.removeChild(this._dom);
            this._dom = null;
        }
    }
    get lines() {
        return this._lines;
    }
    get model() {
        return this._model;
    }
    set model(_model) {
        this._model = _model;
    }
}
exports.VirtualDocument = VirtualDocument;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2RvY3VtZW50Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQXVCLFlBQ3ZCLENBQUMsQ0FEa0M7QUFJbkMsc0JBQW1CLGFBQ25CLENBQUMsQ0FEK0I7QUFHaEM7SUFPSSxZQUFZLE1BQU07UUFGVixTQUFJLEdBQWdCLElBQUksQ0FBQztRQUc3QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFlO1lBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksbUJBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO0lBRXpCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFpQjtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0FBRUwsQ0FBQztBQWhEWSx1QkFBZSxrQkFnRDNCLENBQUEiLCJmaWxlIjoidmlldy9kb2N1bWVudFZpZXcuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
