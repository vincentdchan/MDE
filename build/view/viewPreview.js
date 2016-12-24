"use strict";
const util_1 = require("../util");
const viewScrollBar_1 = require("./viewScrollBar");
const viewPreviewDocument_1 = require("./viewPreviewDocument");
class PreviewView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-preview");
        this._dom.style.overflowY = "hidden";
        this._scrollbar = new viewScrollBar_1.ScrollBarView();
        this._scrollbar.appendTo(this._dom);
        this._scrollbar.on("trainMove", (e) => {
            let scrollHeight = this._document.element().scrollHeight - this._document.element().clientHeight;
            this._document.element().scrollTop = scrollHeight * e.percentage;
        });
        this._document = new viewPreviewDocument_1.PreviewDocumentView();
        this._document.appendTo(this._dom);
        this._textEdit_handler = (evt) => {
            this._document.renderImd();
            setTimeout(() => {
                let docRect = this._document.element().getBoundingClientRect();
                this._scrollbar.trainHeightPercentage = docRect.height / this._document.element().scrollHeight;
                this._scrollbar.trainPositionPercentage = 0;
            }, 10);
        };
        function fixed(num, fixed) {
            let times = Math.pow(10, 2);
            return Math.floor(num * times) / times;
        }
        this._document.on("scroll", (evt) => {
            setTimeout(() => {
                let elm = this._document.element();
                let rect = elm.getBoundingClientRect();
                this._scrollbar.trainPositionPercentage = fixed(elm.scrollTop / (elm.scrollHeight - rect.height), 2);
            });
        });
    }
    bind(model) {
        this._model = model;
        this._model.on("textEdit", this._textEdit_handler);
        this._document.bind(model);
    }
    unbind() {
        this._document.unbind();
        this._model.removeListener("textEdit", this._textEdit_handler);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBOEMsU0FDOUMsQ0FBQyxDQURzRDtBQUN2RCxnQ0FBNEMsaUJBQzVDLENBQUMsQ0FENEQ7QUFDN0Qsc0NBQWtDLHVCQUNsQyxDQUFDLENBRHdEO0FBR3pELDBCQUFpQyxnQkFBUyxDQUFDLFlBQVk7SUFTbkQ7UUFDSSxNQUFNLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRXJDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBYSxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQWlCO1lBQzlDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ2pHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHlDQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEdBQWtCO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsVUFBVSxDQUFDO2dCQUNQLElBQUksT0FBTyxHQUFHLElB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
