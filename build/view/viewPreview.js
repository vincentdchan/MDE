"use strict";
const util_1 = require("../util");
const viewScrollBar_1 = require("./viewScrollBar");
const viewPreviewDocument_1 = require("./viewPreviewDocument");
class PreviewView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-preview");
        this._render_counter = 0;
        this._scrollbar = new viewScrollBar_1.ScrollBarView();
        this._scrollbar.right = 0;
        this._scrollbar.appendTo(this._dom);
        this._scrollbar.on("trainMove", (e) => {
            let scrollHeight = this._document.element().scrollHeight - this._document.element().clientHeight;
            this._document.element().scrollTop = scrollHeight * e.percentage;
        });
        this._document = new viewPreviewDocument_1.PreviewDocumentView();
        this._document.appendTo(this._dom);
        this._textEdit_handler = (evt) => {
            this._render_counter++;
            setTimeout(() => {
                this._render_counter--;
                if (this._render_counter === 0) {
                    this._document.renderImd();
                    setTimeout(() => {
                        this._scrollbar.trainHeightPercentage = this._document.element().clientHeight / this._document.element().scrollHeight;
                        this._scrollbar.trainPositionPercentage = 0;
                    }, 10);
                }
            }, 850);
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
        setTimeout(() => {
            let elm = this._document.element();
            this._scrollbar.trainHeightPercentage = elm.clientHeight / elm.scrollHeight;
        }, 50);
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
        this._document.width = w;
    }
    get height() {
        return super.height;
    }
    set height(h) {
        super.height = h;
        this._document.height = h;
        this._scrollbar.height = h;
    }
    get documentView() {
        return this._document;
    }
    dispose() {
        this._scrollbar.dispose();
        this._document.dispose();
    }
}
exports.PreviewView = PreviewView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBOEMsU0FDOUMsQ0FBQyxDQURzRDtBQUN2RCxnQ0FBNEMsaUJBQzVDLENBQUMsQ0FENEQ7QUFDN0Qsc0NBQWtDLHVCQUNsQyxDQUFDLENBRHdEO0FBR3pELDBCQUFpQyxnQkFBUyxDQUFDLFlBQVk7SUFVbkQ7UUFDSSxNQUFNLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUh4QixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUtoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkJBQWEsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBaUI7WUFDOUMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDakcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUkseUNBQW1CLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsR0FBa0I7WUFDeEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRXZCLFVBQVUsQ0FBQztnQkFDUCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFFM0IsVUFBVSxDQUFDO3dCQUNQLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ3RILElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO29CQUNoRCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztZQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVaLENBQUMsQ0FBQTtRQUVELGVBQWUsR0FBVyxFQUFFLEtBQWE7WUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQyxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBVTtZQUNuQyxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFnQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsVUFBVSxDQUFDO1lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUNoRixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsQ0FBUztRQUNmLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVM7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztBQUVMLENBQUM7QUF4R1ksbUJBQVcsY0F3R3ZCLENBQUEiLCJmaWxlIjoidmlldy92aWV3UHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
