"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const model_1 = require("../model");
const view_1 = require("../view");
const util_1 = require("../util");
const electron_1 = require("electron");
const menu_1 = require("../view/menu");
const { Menu, MenuItem } = electron_1.remote;
const SaveFilter = [
    { name: "Markdown", extensions: ["md"] },
    { name: "Text", extensions: ["txt"] },
    { name: "All Files", extensions: ["*"] }
];
class MDE {
    constructor() {
        this._buffers = [];
        this._view = null;
        this._menu = new menu_1.MainMenuView();
        this._menu.on("menuClick", (evt) => {
            this.handleMenuClick(evt);
        });
        this._menu.setApplicationMenu();
        this._buffer_state = new model_1.BufferState();
        this._view = new view_1.WindowView();
        this._view.bind(this._buffer_state);
    }
    reloadBuffer(buffer) {
        this._buffer_state.dispose();
        this._buffer_state = buffer;
        this._view.unbind();
        this._view.bind(this._buffer_state);
    }
    handleMenuClick(evt) {
        switch (evt.buttonType) {
            case menu_1.MenuButtonType.NewFile:
                this.handleNewFile();
                break;
            case menu_1.MenuButtonType.OpenFile:
                this.handleOpenFile();
                break;
            case menu_1.MenuButtonType.Save:
                this.handleSaveFile(SaveFilter);
                break;
            case menu_1.MenuButtonType.SaveAs:
                this.handleSaveAsFile(SaveFilter);
                break;
            case menu_1.MenuButtonType.Preference:
                break;
            case menu_1.MenuButtonType.OpenDevTools:
                util_1.Host.openDevTools();
                break;
            case menu_1.MenuButtonType.Reload:
                util_1.Host.reload();
                break;
        }
    }
    handleNewFile() {
        let newBuffer = new model_1.BufferState();
        this.reloadBuffer(newBuffer);
    }
    handleOpenFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let filenames = yield util_1.Host.showOpenDialog({
                title: "Open File",
                filters: [
                    { name: "Markdown", extensions: ["md"] },
                    { name: "HTML", extensions: ["html", "htm"] },
                    { name: "Text", extensions: ["txt"] },
                ],
            });
            if (filenames === undefined || filenames === null) {
                throw new Error("Can not get the filename you want to open.");
            }
            else if (filenames.length > 0) {
                let filename = filenames[0];
                let newBuffer = new model_1.BufferState(filename);
                yield newBuffer.readFileContentToModel();
                this.reloadBuffer(newBuffer);
            }
        });
    }
    handleSaveFile(_saveFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            let path;
            if (!this._buffer_state.absolutePath) {
                let paths = yield util_1.Host.showSaveDialog({
                    title: "Save",
                    filters: _saveFilter,
                });
                if (paths) {
                    this._buffer_state.absolutePath = paths;
                }
                else {
                    throw new Error("Illegal path.");
                }
            }
            let result = yield this._buffer_state.writeContentToFile(this._buffer_state.absolutePath);
        });
    }
    handleSaveAsFile(_saveFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            let paths = yield util_1.Host.showSaveDialog({
                title: "Save",
                filters: _saveFilter
            });
            if (paths) {
                let result = yield this._buffer_state.writeContentToFile(paths);
            }
        });
    }
    findLineAncestor(node) {
        let elm = node.parentElement;
        while (true) {
            if (elm.classList.contains("editor-line")) {
                return elm;
            }
            else if (elm === document.body) {
                throw new Error("Element not found.");
            }
            elm = elm.parentElement;
        }
    }
    appendTo(_elem) {
        _elem.appendChild(this._view.element());
    }
    openFile(filename) {
        electron_1.ipcRenderer.send("file-readFile", filename);
    }
    handleFileReadError(event, err) {
        console.log(err);
    }
    dispose() {
        if (this._buffer_state) {
            this._buffer_state.dispose();
            this._buffer_state = null;
        }
        this._view.dispose();
        this._view = null;
    }
    get editorView() {
        return this._view.editorView;
    }
    get documentView() {
        return this._view.editorView.documentView;
    }
    get view() {
        return this._view;
    }
    get buffer() {
        return this._buffer_state;
    }
}
exports.MDE = MDE;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsd0JBQ2lDLFVBQ2pDLENBQUMsQ0FEMEM7QUFDM0MsdUJBQWlELFNBQ2pELENBQUMsQ0FEeUQ7QUFDMUQsdUJBQWdDLFNBQ2hDLENBQUMsQ0FEd0M7QUFDekMsMkJBQWtDLFVBQ2xDLENBQUMsQ0FEMkM7QUFDNUMsdUJBQTJELGNBQzNELENBQUMsQ0FEd0U7QUFDekUsTUFBTSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxpQkFBTSxDQUFBO0FBRy9CLE1BQU0sVUFBVSxHQUFHO0lBQ2YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3hDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNyQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDM0MsQ0FBQztBQUVGO0lBYUk7UUFYUSxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQU0zQixVQUFLLEdBQWUsSUFBSSxDQUFDO1FBTzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBbUI7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDO1FBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBVSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXhDLENBQUM7SUFFTyxZQUFZLENBQUMsTUFBbUI7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUU1QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQW1CO1FBQ3ZDLE1BQU0sQ0FBQSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUsscUJBQWMsQ0FBQyxPQUFPO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxRQUFRO2dCQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQztZQUNWLEtBQUsscUJBQWMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsTUFBTTtnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsQyxLQUFLLENBQUM7WUFDVixLQUFLLHFCQUFjLENBQUMsVUFBVTtnQkFDMUIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLFlBQVk7Z0JBQzVCLFdBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1lBQ1YsS0FBSyxxQkFBYyxDQUFDLE1BQU07Z0JBQ3RCLFdBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRWEsY0FBYzs7WUFDeEIsSUFBSSxTQUFTLEdBQWEsTUFBTSxXQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNoRCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsT0FBTyxFQUFFO29CQUNMLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDN0MsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2lCQUN4QzthQUNKLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztZQUNsRSxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLFNBQVMsR0FBRyxJQUFJLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVhLGNBQWMsQ0FBQyxXQUFXOztZQUVwQyxJQUFJLElBQVksQ0FBQztZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEdBQUcsTUFBTSxXQUFJLENBQUMsY0FBYyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsTUFBTTtvQkFDYixPQUFPLEVBQUUsV0FBVztpQkFDdkIsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUM1QyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDbEMsQ0FBQztRQUVOLENBQUM7S0FBQTtJQUVhLGdCQUFnQixDQUFDLFdBQVc7O1lBRXRDLElBQUksS0FBSyxHQUFHLE1BQU0sV0FBSSxDQUFDLGNBQWMsQ0FBQztnQkFDbEMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLFdBQVc7YUFDdkIsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsQ0FBQztRQUVMLENBQUM7S0FBQTtJQUVPLGdCQUFnQixDQUFDLElBQVU7UUFDL0IsSUFBSSxHQUFHLEdBQWdCLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWtCO1FBQ3ZCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBZ0I7UUFDckIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFnQyxFQUFFLEdBQTBCO1FBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQTtJQUM3QixDQUFDO0FBRUwsQ0FBQztBQTVLWSxXQUFHLE1BNEtmLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
