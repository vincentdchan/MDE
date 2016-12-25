"use strict";
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const events_1 = require("events");
const util_1 = require("../util");
(function (MenuButtonType) {
    MenuButtonType[MenuButtonType["NewFile"] = 0] = "NewFile";
    MenuButtonType[MenuButtonType["OpenFile"] = 1] = "OpenFile";
    MenuButtonType[MenuButtonType["Save"] = 2] = "Save";
    MenuButtonType[MenuButtonType["SaveAs"] = 3] = "SaveAs";
    MenuButtonType[MenuButtonType["Preference"] = 4] = "Preference";
    MenuButtonType[MenuButtonType["Exit"] = 5] = "Exit";
    MenuButtonType[MenuButtonType["Undo"] = 6] = "Undo";
    MenuButtonType[MenuButtonType["Redo"] = 7] = "Redo";
    MenuButtonType[MenuButtonType["Cut"] = 8] = "Cut";
    MenuButtonType[MenuButtonType["Copy"] = 9] = "Copy";
    MenuButtonType[MenuButtonType["Paste"] = 10] = "Paste";
    MenuButtonType[MenuButtonType["SelectAll"] = 11] = "SelectAll";
    MenuButtonType[MenuButtonType["OpenDevTools"] = 12] = "OpenDevTools";
    MenuButtonType[MenuButtonType["Reload"] = 13] = "Reload";
    MenuButtonType[MenuButtonType["Documentation"] = 14] = "Documentation";
    MenuButtonType[MenuButtonType["About"] = 15] = "About";
    MenuButtonType[MenuButtonType["WhiteTheme"] = 16] = "WhiteTheme";
    MenuButtonType[MenuButtonType["BlackTheme"] = 17] = "BlackTheme";
})(exports.MenuButtonType || (exports.MenuButtonType = {}));
var MenuButtonType = exports.MenuButtonType;
class MenuClickEvent extends Event {
    constructor(buttonType) {
        super("menuClick");
        this._type = buttonType;
    }
    get buttonType() {
        return this._type;
    }
}
exports.MenuClickEvent = MenuClickEvent;
class MainMenuView extends events_1.EventEmitter {
    constructor() {
        super();
        this.buildMenu();
    }
    buildMenu() {
        let options = [
            {
                label: util_1.i18n.getString("file"),
                submenu: [
                    {
                        label: util_1.i18n.getString("file.newFile"),
                        accelerator: "Ctrl+N",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.NewFile); }
                    },
                    {
                        type: "separator",
                    },
                    {
                        label: util_1.i18n.getString("file.open"),
                        accelerator: "Ctrl+O",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenFile); }
                    },
                    {
                        label: util_1.i18n.getString("file.save"),
                        accelerator: "Ctrl+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Save); }
                    },
                    {
                        label: util_1.i18n.getString("file.saveAs"),
                        accelerator: "Ctrl+Shift+S",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SaveAs); }
                    },
                    {
                        label: util_1.i18n.getString("file.preference"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Preference); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("file.exit"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Exit); }
                    }
                ]
            },
            {
                label: util_1.i18n.getString("edit"),
                submenu: [
                    {
                        label: util_1.i18n.getString("edit.undo"),
                        accelerator: "Ctrl+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Undo); }
                    },
                    {
                        label: util_1.i18n.getString("edit.redo"),
                        accelerator: "Ctrl+Shift+Z",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Redo); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("edit.cut"),
                        accelerator: "Ctrl+X",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Cut); }
                    },
                    {
                        label: util_1.i18n.getString("edit.copy"),
                        accelerator: "Ctrl+C",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Copy); }
                    },
                    {
                        label: util_1.i18n.getString("edit.paste"),
                        accelerator: "Ctrl+V",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Paste); }
                    },
                    {
                        label: util_1.i18n.getString("edit.selectAll"),
                        accelerator: "Ctrl+A",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.SelectAll); }
                    },
                ]
            },
            {
                label: util_1.i18n.getString("view"),
                submenu: [
                    {
                        label: util_1.i18n.getString("view.whiteTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.WhiteTheme); },
                    },
                    {
                        label: util_1.i18n.getString("view.blackTheme"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.BlackTheme); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("view.openDevTools"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.OpenDevTools); }
                    },
                    {
                        label: util_1.i18n.getString("view.reload"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Reload); }
                    }
                ]
            },
            {
                label: util_1.i18n.getString("help"),
                submenu: [
                    {
                        label: util_1.i18n.getString("help.documentation"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Documentation); }
                    },
                    {
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("help.about"),
                        click: () => { this.emitMenuClickEvent(MenuButtonType.About); }
                    }
                ]
            }
        ];
        this._menu = Menu.buildFromTemplate(options);
    }
    emitMenuClickEvent(_type) {
        let evt = new MenuClickEvent(_type);
        this.emit("menuClick", evt);
    }
    setApplicationMenu() {
        Menu.setApplicationMenu(this._menu);
    }
    get electronMenu() {
        return this._menu;
    }
}
exports.MainMenuView = MainMenuView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
