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
    MenuButtonType[MenuButtonType["Exit"] = 5] = "Exit";
    MenuButtonType[MenuButtonType["Undo"] = 6] = "Undo";
    MenuButtonType[MenuButtonType["Redo"] = 7] = "Redo";
    MenuButtonType[MenuButtonType["Cut"] = 8] = "Cut";
    MenuButtonType[MenuButtonType["Copy"] = 9] = "Copy";
    MenuButtonType[MenuButtonType["Paste"] = 10] = "Paste";
    MenuButtonType[MenuButtonType["SelectAll"] = 11] = "SelectAll";
    MenuButtonType[MenuButtonType["Search"] = 12] = "Search";
    MenuButtonType[MenuButtonType["Replace"] = 13] = "Replace";
    MenuButtonType[MenuButtonType["OpenDevTools"] = 14] = "OpenDevTools";
    MenuButtonType[MenuButtonType["Reload"] = 15] = "Reload";
    MenuButtonType[MenuButtonType["Documentation"] = 16] = "Documentation";
    MenuButtonType[MenuButtonType["About"] = 17] = "About";
    MenuButtonType[MenuButtonType["WhiteTheme"] = 18] = "WhiteTheme";
    MenuButtonType[MenuButtonType["BlackTheme"] = 19] = "BlackTheme";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7cUJBQ3RFO29CQUNEO3dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO3dCQUNyQyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUMsQ0FBQztxQkFDdEU7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFdBQVc7cUJBQ3BCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO3dCQUN2QyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsQ0FBQztxQkFDeEU7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO3dCQUNqQyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsQ0FBQztxQkFDbEU7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDMUIsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO3dCQUN4QyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUMsQ0FBQztxQkFDekU7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLFdBQVc7cUJBQ3BCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQzt3QkFDaEMsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUM7cUJBQ2pFO2lCQUNKO2FBQ0o7U0FDSixDQUFBO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEtBQXFCO1FBQzVDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBRUo7QUFyS0Qsb0NBcUtDIiwiZmlsZSI6InZpZXcvbWVudS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
