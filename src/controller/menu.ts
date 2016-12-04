import {remote} from "electron"
const {Menu, MenuItem} = remote
import {MDE} from "./controller"
import {Host} from "../util"

async function handleOpenFile(mde: MDE) {
    let filenames: string[] = await Host.showOpenDialog({
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
        let content = await Host.readFile(filename, "UTF-8");

        mde.reloadText(content);
    }
}

async function handleSaveFile(mde: MDE, _saveFilter) {
    let filename = await Host.showOpenDialog({
        title: "Save File",
        filters: _saveFilter,
    });

    let content = mde.model.reportAll();
}

export function menuGenerator(mde: MDE) : Electron.Menu {
    const SaveFilter = [
        { name: "Markdown", extensions: ["md"] },
        { name: "Text", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] }
    ];

    let options: Electron.MenuItemOptions[] = [
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
                        Host.openDevTools();
                    }
                },
                {
                    label: "Reload",
                    click() {
                        Host.reload();
                    }
                }
            ]
        }
    ]

    let menu = Menu.buildFromTemplate(options);
    return menu;

}
