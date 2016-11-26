"use strict";
const util_1 = require("../util");
const viewLeftPanel_1 = require("./viewLeftPanel");
const viewEditor_1 = require("./viewEditor");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(_model) {
        super("div", "mde-window");
        this.requestWindowSize();
        window.addEventListener("resize", (e) => {
            setTimeout(() => {
                this.requestWindowSize();
                this.updateLayout();
            }, 20);
        });
        this._model = _model;
        this._leftPanel = new viewLeftPanel_1.LeftPanelView(WindowView.leftPadWidth, this._height);
        this._leftPanel.appendTo(this._dom);
        this._editor = new viewEditor_1.EditorView(this._model);
        this._editor.appendTo(this._dom);
        this.updateLayout();
    }
    updateLayout() {
        if (this._width < WindowView.leftPadWidth * 1.5) {
            this._leftPanel.width = 0;
        }
        else {
            this._leftPanel.width = WindowView.leftPadWidth;
        }
        this._leftPanel.height = this._height;
        this._editor.width = (this._width - this._leftPanel.width);
        this._editor.height = this._height;
        this._editor.element().style.marginLeft = this._leftPanel.width + "px";
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get leftPanelView() {
        return this._leftPanel;
    }
    requestWindowSize() {
        this._width = document.documentElement.clientWidth;
        this._height = document.documentElement.clientHeight;
    }
    get editorView() {
        return this._editor;
    }
    dispose() {
        if (this._editor != null) {
            this._editor.dispose();
            this._editor = null;
        }
    }
}
WindowView.leftPadWidth = 250;
exports.WindowView = WindowView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBQzlDLGdDQUE0QixpQkFDNUIsQ0FBQyxDQUQ0QztBQUM3Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUd2Qyx5QkFBZ0MsZ0JBQVMsQ0FBQyxvQkFBb0I7SUFZMUQsWUFBWSxNQUFrQjtRQUMxQixNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBUztZQUV4QyxVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFWCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sWUFBWTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNwRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUV0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDM0UsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDMUIsQ0FBQztJQUVPLGlCQUFpQjtRQUdyQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7SUFDekQsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBN0UwQix1QkFBWSxHQUFHLEdBQUcsQ0FBQztBQUZqQyxrQkFBVSxhQStFdEIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdXaW5kb3cuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
