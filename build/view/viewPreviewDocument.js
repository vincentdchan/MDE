"use strict";
const util_1 = require("../util");
const marked = require("marked");
const electron_1 = require("electron");
const typescript_domhelper_1 = require("typescript-domhelper");
class PreviewDocumentView extends util_1.DomWrapper.AbsoluteElement {
    constructor() {
        super("div", "mde-preview-document");
        this._dom.style.overflow = "scroll";
        this._dom.addEventListener("mouseup", (evt) => {
            this.handleDocMouseUp(evt);
        }, false);
    }
    bind(model) {
        this._model = model;
        this._container = typescript_domhelper_1.Dom.Div("mde-preview-document-container");
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
        this._HTMLContent = marked(content);
        this._container.innerHTML = this._HTMLContent;
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
    get HTMLContent() {
        return this._HTMLContent;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFtRTtBQUVuRSxpQ0FBaUM7QUFFakMsdUNBQWlEO0FBQ2pELCtEQUF3QztBQVF4Qyx5QkFBaUMsU0FBUSxpQkFBVSxDQUFDLGVBQWU7SUFNL0Q7UUFDSSxLQUFLLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQWU7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVkLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBZ0I7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRywwQkFBRyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQVU7WUFDbkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVU7Z0JBQ25DLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFckIsSUFBSSxNQUFNLEdBQXNCLENBQUMsQ0FBQztnQkFDbEMsZ0JBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBTUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNsRCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBZTtRQUNwQyxNQUFNLENBQUEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBZTtRQUNyQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckIsSUFBSSxPQUFPLEdBQStCO1lBQ3RDO2dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO2dCQUN0QyxXQUFXLEVBQUUsV0FBVztnQkFDeEIsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBLENBQUMsQ0FBQzthQUMxQztTQUNKLENBQUE7UUFFRCxJQUFJLElBQUksR0FBRyxpQkFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0NBRUo7QUExRkQsa0RBMEZDIiwiZmlsZSI6InZpZXcvdmlld1ByZXZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
