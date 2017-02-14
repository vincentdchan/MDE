"use strict";
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const events_1 = require("events");
const util_1 = require("../util");
var MenuButtonType;
(function (MenuButtonType) {
    MenuButtonType[MenuButtonType["NewFile"] = 0] = "NewFile";
    MenuButtonType[MenuButtonType["OpenFile"] = 1] = "OpenFile";
    MenuButtonType[MenuButtonType["Save"] = 2] = "Save";
    MenuButtonType[MenuButtonType["SaveAs"] = 3] = "SaveAs";
    MenuButtonType[MenuButtonType["Preference"] = 4] = "Preference";
    MenuButtonType[MenuButtonType["ExportHTML"] = 5] = "ExportHTML";
    MenuButtonType[MenuButtonType["Exit"] = 6] = "Exit";
    MenuButtonType[MenuButtonType["Undo"] = 7] = "Undo";
    MenuButtonType[MenuButtonType["Redo"] = 8] = "Redo";
    MenuButtonType[MenuButtonType["Cut"] = 9] = "Cut";
    MenuButtonType[MenuButtonType["Copy"] = 10] = "Copy";
    MenuButtonType[MenuButtonType["Paste"] = 11] = "Paste";
    MenuButtonType[MenuButtonType["SelectAll"] = 12] = "SelectAll";
    MenuButtonType[MenuButtonType["Search"] = 13] = "Search";
    MenuButtonType[MenuButtonType["Replace"] = 14] = "Replace";
    MenuButtonType[MenuButtonType["OpenDevTools"] = 15] = "OpenDevTools";
    MenuButtonType[MenuButtonType["Reload"] = 16] = "Reload";
    MenuButtonType[MenuButtonType["Documentation"] = 17] = "Documentation";
    MenuButtonType[MenuButtonType["About"] = 18] = "About";
    MenuButtonType[MenuButtonType["WhiteTheme"] = 19] = "WhiteTheme";
    MenuButtonType[MenuButtonType["BlackTheme"] = 20] = "BlackTheme";
})(MenuButtonType = exports.MenuButtonType || (exports.MenuButtonType = {}));
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
                        label: util_1.i18n.getString("file.export"),
                        submenu: [
                            {
                                label: util_1.i18n.getString("file.export.HTML"),
                                click: () => { this.emitMenuClickEvent(MenuButtonType.ExportHTML); }
                            }
                        ]
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
                        type: "separator"
                    },
                    {
                        label: util_1.i18n.getString("edit.search"),
                        accelerator: "Ctrl+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Search); }
                    },
                    {
                        label: util_1.i18n.getString("edit.replace"),
                        accelerator: "Ctrl+Shift+F",
                        click: () => { this.emitMenuClickEvent(MenuButtonType.Replace); }
                    },
                    {
                        type: "separator"
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
