"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBbUU7QUFFbkUsaUNBQWlDO0FBRWpDLHVDQUFpRDtBQUNqRCwrREFBd0M7QUFReEMseUJBQWlDLFNBQVEsaUJBQVUsQ0FBQyxlQUFlO0lBTS9EO1FBQ0ksS0FBSyxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFlO1lBQ2xELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFZCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxVQUFVLEdBQUcsMEJBQUcsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFVO1lBQ25CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFVO2dCQUNuQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRXJCLElBQUksTUFBTSxHQUFzQixDQUFDLENBQUM7Z0JBQ2xDLGdCQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQU1ELE1BQU07UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDbEQsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEdBQWU7UUFDcEMsTUFBTSxDQUFBLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUM7UUFDZixDQUFDO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEdBQWU7UUFDckMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXJCLElBQUksT0FBTyxHQUErQjtZQUN0QztnQkFDSSxLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdEMsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxRQUFRLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQSxDQUFDLENBQUM7YUFDMUM7U0FDSixDQUFBO1FBRUQsSUFBSSxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEMsb0JBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0wsQ0FBQztDQUVKO0FBMUZELGtEQTBGQyIsImZpbGUiOiJ2aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
