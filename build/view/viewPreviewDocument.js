"use strict";
const util_1 = require("../util");
const marked = require("marked");
class PreviewDocumentView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-preview-document");
        this._dom.style.overflow = "scroll";
        this._container = util_1.DomHelper.Generic.elem("div", "mde-preview-document-container");
        this._dom.appendChild(this._container);
        this._textEdit_handler = (evt) => {
            this.renderImd();
        };
    }
    bind(model) {
        this._model = model;
        this._model.on("textEdit", this._textEdit_handler);
    }
    unbind() {
        this._model.removeListener("textEdit", this._textEdit_handler);
        this._model = null;
    }
    renderImd() {
        let content = this._model.reportAll();
        this._container.innerHTML = marked(content);
    }
    dispose() {
        if (this._model) {
            this.unbind();
        }
        this._dom.removeChild(this._container);
    }
}
exports.PreviewDocumentView = PreviewDocumentView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdQcmV2aWV3RG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE4QyxTQUM5QyxDQUFDLENBRHNEO0FBRXZELE1BQVksTUFBTSxXQUFPLFFBRXpCLENBQUMsQ0FGZ0M7QUFFakMsa0NBQXlDLGdCQUFTLENBQUMsZUFBZTtJQU05RDtRQUNJLE1BQU0sS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVwQyxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBaUIsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEdBQWtCO1lBQ3hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUE7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFNRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0FBRUwsQ0FBQztBQTdDWSwyQkFBbUIsc0JBNkMvQixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1ByZXZpZXdEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
