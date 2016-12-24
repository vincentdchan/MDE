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
                label: "Copy",
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE4QyxTQUM5QyxDQUFDLENBRHNEO0FBRXZELE1BQVksTUFBTSxXQUFPLFFBQ3pCLENBQUMsQ0FEZ0M7QUFFakMsMkJBQWdDLFVBRWhDLENBQUMsQ0FGeUM7QUFFMUMsa0NBQXlDLGdCQUFTLENBQUMsZUFBZTtJQUs5RDtRQUNJLE1BQU0sS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQWU7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQyxLQUFnQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBaUIsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBTUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxHQUFlO1FBQ3BDLE1BQU0sQ0FBQSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDO1FBQ2YsQ0FBQztJQUNMLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxHQUFlO1FBQ3JDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVyQixJQUFJLE9BQU8sR0FBK0I7WUFDdEM7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07Z0JBQ2IsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLEtBQUssRUFBRSxRQUFRLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQSxDQUFDLENBQUM7YUFDMUM7U0FDSixDQUFBO1FBRUQsSUFBSSxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoQyxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0FBRUwsQ0FBQztBQXhFWSwyQkFBbUIsc0JBd0UvQixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1ByZXZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
