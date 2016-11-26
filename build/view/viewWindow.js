"use strict";
const util_1 = require("../util");
const viewLeftPanel_1 = require("./viewLeftPanel");
const viewEditor_1 = require("./viewEditor");
class WindowView extends util_1.DomHelper.AppendableDomWrapper {
    constructor(_model) {
        super("div", "mde-window");
        this.requestWindowSize();
        window.addEventListener("resize", (e) => {
            this.requestWindowSize();
            this.updateLayout();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdXaW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUNyQyxDQUFDLENBRDZDO0FBQzlDLGdDQUE0QixpQkFDNUIsQ0FBQyxDQUQ0QztBQUM3Qyw2QkFBeUIsY0FDekIsQ0FBQyxDQURzQztBQUd2Qyx5QkFBZ0MsZ0JBQVMsQ0FBQyxvQkFBb0I7SUFZMUQsWUFBWSxNQUFrQjtRQUMxQixNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBUztZQUN4QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNkJBQWEsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLFlBQVk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFDcEQsQ0FBQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzNFLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQzFCLENBQUM7SUFFTyxpQkFBaUI7UUFHckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7SUFDTCxDQUFDO0FBRUwsQ0FBQztBQTFFMEIsdUJBQVksR0FBRyxHQUFHLENBQUM7QUFGakMsa0JBQVUsYUE0RXRCLENBQUEiLCJmaWxlIjoidmlldy92aWV3V2luZG93LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
