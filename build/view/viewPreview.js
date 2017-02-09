"use strict";
const util_1 = require("../util");
const viewScrollBar_1 = require("./viewScrollBar");
const viewPreviewDocument_1 = require("./viewPreviewDocument");
class PreviewView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-preview");
        this._render_counter = 0;
        this._dom.addEventListener("mousemove", (e) => {
            this._scrollbar.excite();
        });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBdUQ7QUFDdkQsbURBQTZEO0FBQzdELCtEQUF5RDtBQUd6RCxpQkFBeUIsU0FBUSxnQkFBUyxDQUFDLFlBQVk7SUFVbkQ7UUFDSSxLQUFLLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBSHhCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBS2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBYTtZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDZCQUFhLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQWlCO1lBQzlDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ2pHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHlDQUFtQixFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEdBQWtCO1lBQ3hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2QixVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRTNCLFVBQVUsQ0FBQzt3QkFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUN0SCxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztvQkFDaEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNYLENBQUM7WUFDTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFWixDQUFDLENBQUE7UUFFRCxlQUFlLEdBQVcsRUFBRSxLQUFhO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQVU7WUFDbkMsVUFBVSxDQUFDO2dCQUNQLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25DLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekcsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBZ0I7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNCLFVBQVUsQ0FBQztZQUNQLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDaEYsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVM7UUFDZixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFTO1FBQ2hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FFSjtBQTVHRCxrQ0E0R0MiLCJmaWxlIjoidmlldy92aWV3UHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
