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
        this._dom.addEventListener("click", (evt) => {
            let targetElm = evt.target;
            if (targetElm.tagName && targetElm.tagName == "A") {
                evt.preventDefault();
                let anchor = targetElm;
                electron_1.shell.openExternal(anchor.href);
            }
        });
    }
    bind(model) {
        this._model = model;
        this._container = util_1.DomHelper.Generic.elem("div", "mde-preview-document-container");
        this._dom.appendChild(this._container);
        this.renderImd();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrRTtBQUVsRSxpQ0FBaUM7QUFFakMsdUNBQWlEO0FBRWpELHlCQUFpQyxTQUFRLGdCQUFTLENBQUMsZUFBZTtJQUs5RDtRQUNJLEtBQUssQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXBDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBZTtZQUNsRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFlO1lBQ2hELElBQUksU0FBUyxHQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFckIsSUFBSSxNQUFNLEdBQXNCLFNBQVMsQ0FBQztnQkFDMUMsZ0JBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBZ0I7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQWlCLEtBQUssRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQU1ELE1BQU07UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBZTtRQUNwQyxNQUFNLENBQUEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQztRQUNmLENBQUM7SUFDTCxDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBZTtRQUNyQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFckIsSUFBSSxPQUFPLEdBQStCO1lBQ3RDO2dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO2dCQUN0QyxXQUFXLEVBQUUsV0FBVztnQkFDeEIsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBLENBQUMsQ0FBQzthQUMxQztTQUNKLENBQUE7UUFFRCxJQUFJLElBQUksR0FBRyxpQkFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLG9CQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7Q0FFSjtBQWxGRCxrREFrRkMiLCJmaWxlIjoidmlldy92aWV3UHJldmlld0RvY3VtZW50LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
