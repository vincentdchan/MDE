"use strict";
const util_1 = require("../util");
const viewLeftPanel_1 = require("./viewLeftPanel");
const viewEditor_1 = require("./viewEditor");
const viewSplitter_1 = require("./viewSplitter");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(_model) {
        super("div", "mde-window");
        this._mouseMoveHandler = null;
        this.requestWindowSize();
        window.addEventListener("resize", (e) => {
            setTimeout(() => {
                let size = this.requestWindowSize();
                this.height = size.height;
                this.width = size.width;
            }, 20);
        });
        this._model = _model;
        this._leftPanel = new viewLeftPanel_1.LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);
        this._splitter = new viewSplitter_1.SplitterView();
        this._splitter.appendTo(this._dom);
        this._editor = new viewEditor_1.EditorView(this._model);
        this._editor.appendTo(this._dom);
        let _size = this.requestWindowSize();
        this.width = _size.width;
        this.height = _size.height;
        this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
        this._splitter.element().style.opacity = "0.5";
        this._splitter.onMouseDown(this.handleSplitterMouseDown.bind(this));
        window.addEventListener("mouseup", this.handleWindowMouseUp.bind(this), true);
        this._editor.marginLeft = this._leftPanel.width;
    }
    handleSplitterMouseDown(id, evt) {
        this._mouseMoveHandler = this.handleWindowMouseMove.bind(this);
        window.addEventListener("mousemove", this._mouseMoveHandler, true);
    }
    handleWindowMouseUp(evt) {
        if (this._mouseMoveHandler !== null) {
            window.removeEventListener("mousemove", this._mouseMoveHandler, true);
        }
    }
    handleWindowMouseMove(evt) {
        let offsetX = evt.clientX;
        if (offsetX >= viewLeftPanel_1.LeftPanelView.MinWidth && offsetX <= this._width - viewEditor_1.EditorView.MinWidth) {
            this._leftPanel.width = offsetX;
            this._splitter.marginLeft = offsetX - this._splitter.width;
            this._editor.width = this._width - offsetX;
            this._editor.marginLeft = offsetX;
        }
    }
    get width() {
        return this._width;
    }
    set width(w) {
        if (w !== this._width) {
            this._width = w;
            if (this._width < WindowView.leftPadWidth * 2) {
                this._leftPanel.collapsed = true;
            }
            else {
                this._leftPanel.collapsed = false;
            }
            this._editor.width = this._width - this._leftPanel.width;
            this._editor.marginLeft = this._leftPanel.width;
            this._splitter.marginLeft = this._leftPanel.width - this._splitter.width;
        }
    }
    get height() {
        return this._height;
    }
    set height(h) {
        if (h !== this._height) {
            this._height = h;
            this._leftPanel.height = h;
            this._splitter.height = h;
            this._editor.height = h;
        }
    }
    get leftPanelView() {
        return this._leftPanel;
    }
    requestWindowSize() {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
    }
    get editorView() {
        return this._editor;
    }
    get splitterView() {
        return this._splitter;
    }
    dispose() {
        if (this._editor != null) {
            this._editor.dispose();
            this._editor = null;
        }
    }
}
WindowView.leftPadWidth = 220;
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBQzlDLGdDQUE0QixpQkFDNUIsQ0FBQyxDQUQ0QztBQUM3Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUN2QywrQkFBMkIsZ0JBQzNCLENBQUMsQ0FEMEM7QUFRM0MseUJBQWdDLGdCQUFTLENBQUMsb0JBQW9CO0lBYTFELFlBQVksTUFBa0I7UUFDMUIsTUFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFzQ3ZCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQXBDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQVM7WUFFeEMsVUFBVSxDQUFDO2dCQUNQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFWCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFcEUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ3BELENBQUM7SUFHTyx1QkFBdUIsQ0FBQyxFQUF5QixFQUFFLEdBQWU7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEdBQWU7UUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsQ0FBQztJQUNMLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxHQUFlO1FBQ3pDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLDZCQUFhLENBQUMsUUFBUSxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLHVCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUN0QyxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFTO1FBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUM3RSxDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxDQUFTO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQzFCLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxDQUFDO1lBQ0gsS0FBSyxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVztZQUMzQyxNQUFNLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZO1NBQ2hELENBQUE7SUFDTCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBcEkwQix1QkFBWSxHQUFHLEdBQUcsQ0FBQztBQUZqQyxrQkFBVSxhQXNJdEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdXaW5kb3cuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
