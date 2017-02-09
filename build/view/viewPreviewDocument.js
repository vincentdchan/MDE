"use strict";
const util_1 = require("../util");
const marked = require("marked");
const electron_1 = require("electron");
class PreviewDocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-preview-document");
        this._dom.style.overflow = "scroll";
        this._dom.addEventListener("mouseup", (evt) => {
            this.handleDocMouseUp(evt);
        }, false);
    }
    bind(model) {
        this._model = model;
        this._container = util_1.DomHelper.Generic.elem("div", "mde-preview-document-container");
        this._dom.appendChild(this._container);
        this.renderImd();
        let elems = this._dom.getElementsByTagName("A");
        let arr = [...elems];
        arr.forEach((a) => {
            a.addEventListener("click", (evt) => {
                evt.preventDefault();
                let anchor = a;
                electron_1.shell.openExternal(anchor.href);
            });
        });
    }
    unbind() {
        this._model = null;
        this._dom.removeChild(this._container);
    }
    renderImd() {
        let content = this._model.reportAll();
        this._container.innerHTML = marked(content);
    }
    handleDocMouseUp(evt) {
        switch (evt.which) {
            case 3:
                this.handleContextMenu(evt);
                return;
        }
    }
    handleContextMenu(evt) {
        evt.preventDefault();
        let options = [
            {
                label: util_1.i18n.getString("contextmenu.copy"),
                accelerator: "Control+C",
                click: () => { this.copyToClipboard(); }
            },
        ];
        let menu = electron_1.remote.Menu.buildFromTemplate(options);
        menu.popup(electron_1.remote.getCurrentWindow());
    }
    copyToClipboard() {
        let sel = window.getSelection();
        electron_1.clipboard.writeText(sel.toString());
    }
    dispose() {
        if (this._model) {
            this.unbind();
        }
    }
}
exports.PreviewDocumentView = PreviewDocumentView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrRTtBQUVsRSxpQ0FBaUM7QUFFakMsdUNBQWlEO0FBRWpELHlCQUFpQyxTQUFRLGdCQUFTLENBQUMsZUFBZTtJQUs5RDtRQUNJLEtBQUssQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBZTtZQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWQsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFnQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBaUIsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNyQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBVTtZQUNuQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVTtnQkFDbkMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUVyQixJQUFJLE1BQU0sR0FBc0IsQ0FBQyxDQUFDO2dCQUNsQyxnQkFBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFNRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEdBQWU7UUFDcEMsTUFBTSxDQUFBLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEdBQWU7UUFDckMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXJCLElBQUksT0FBTyxHQUErQjtZQUN0QztnQkFDSSxLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdEMsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxRQUFRLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQSxDQUFDLENBQUM7YUFDMUM7U0FDSixDQUFBO1FBRUQsSUFBSSxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0NBRUo7QUFwRkQsa0RBb0ZDIiwiZmlsZSI6InZpZXcvdmlld1ByZXZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
