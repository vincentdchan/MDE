"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const util_1 = require("../util");
function handleOpenFile(mde) {
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
            let content = yield util_1.Host.readFile(filename, "UTF-8");
            mde.reloadText(content);
        }
    });
}
function handleSaveFile(mde, _saveFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        let filename = yield util_1.Host.showOpenDialog({
            title: "Save File",
            filters: _saveFilter,
        });
        let content = mde.model.reportAll();
    });
}
function menuGenerator(mde) {
    const SaveFilter = [
        { name: "Markdown", extensions: ["md"] },
        { name: "Text", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] }
    ];
    let options = [
        {
            label: "File",
            submenu: [
                {
                    label: "New File",
                },
                {
                    type: "separator",
                },
                {
                    label: "Open",
                    click: () => {
                        handleOpenFile(mde);
                    }
                },
                {
                    label: "Save",
                    click() {
                        handleSaveFile(mde, SaveFilter);
                    }
                },
                {
                    label: "Save as",
                    click() {
                    }
                },
                {
                    label: "Preference"
                },
                {
                    type: "separator"
                },
                {
                    label: "Exit"
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    role: "undo"
                },
                {
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    role: "cut"
                },
                {
                    role: "copy"
                },
                {
                    role: "paste"
                },
                {
                    role: "selectall"
                },
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Open dev tools",
                    click() {
                        util_1.Host.openDevTools();
                    }
                },
                {
                    label: "Reload",
                    click() {
                        util_1.Host.reload();
                    }
                }
            ]
        },
        {
            label: "Buffers"
        },
        {
            label: "Help",
            submenu: [
                {
                    label: "Documentation"
                },
                {
                    type: "separator"
                },
                {
                    label: "About"
                }
            ]
        }
    ];
    let menu = Menu.buildFromTemplate(options);
    return menu;
}
exports.menuGenerator = menuGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL21lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkJBQXFCLFVBQ3JCLENBQUMsQ0FEOEI7QUFDL0IsTUFBTSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsR0FBRyxpQkFBTSxDQUFBO0FBRS9CLHVCQUFtQixTQUVuQixDQUFDLENBRjJCO0FBRTVCLHdCQUE4QixHQUFROztRQUNsQyxJQUFJLFNBQVMsR0FBYSxNQUFNLFdBQUksQ0FBQyxjQUFjLENBQUM7WUFDaEQsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFO2dCQUNMLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDN0MsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2FBQ3hDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksT0FBTyxHQUFHLE1BQU0sV0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFckQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBRUQsd0JB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
