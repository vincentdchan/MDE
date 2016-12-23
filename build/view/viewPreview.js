"use strict";
const util_1 = require("../util");
const viewScrollBar_1 = require("./viewScrollBar");
const viewPreviewDocument_1 = require("./viewPreviewDocument");
class PreviewView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-preview");
        this._dom.style.overflowY = "hidden";
        this._scrollbar = new viewScrollBar_1.ScrollBarView();
        this._scrollbar.appendTo(this._dom);
        this._document = new viewPreviewDocument_1.PreviewDocumentView();
        this._document.appendTo(this._dom);
    }
    bind(model) {
        this._model = model;
        this._document.bind(model);
    }
    unbind() {
        this._document.unbind();
        this._model = null;
    }
    get width() {
        return super.width;
    }
    set width(w) {
        super.width = w;
        this._document.width = w - this._scrollbar.width;
        this._scrollbar.marginLeft = w - this._scrollbar.width;
    }
    get height() {
        return super.height;
    }
    set height(h) {
        super.height = h;
        this._document.height = h;
        this._scrollbar.height = h;
    }
    dispose() {
        this._scrollbar.dispose();
        this._document.dispose();
    }
}
exports.PreviewView = PreviewView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBOEMsU0FDOUMsQ0FBQyxDQURzRDtBQUN2RCxnQ0FBNEIsaUJBQzVCLENBQUMsQ0FENEM7QUFDN0Msc0NBQWtDLHVCQUNsQyxDQUFDLENBRHdEO0FBR3pELDBCQUFpQyxnQkFBUyxDQUFDLGVBQWU7SUFPdEQ7UUFDSSxNQUFNLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRXJDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVM7UUFDZixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQzNELENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBUztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7QUFFTCxDQUFDO0FBeERZLG1CQUFXLGNBd0R2QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1ByZXZpZXcuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
