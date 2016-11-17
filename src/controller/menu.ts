import {remote} from "electron"
const {Menu, MenuItem} = remote

const menuTemplate : Electron.MenuItemOptions[] = [
    {
        label: "File",
        submenu: [
            {
                label: "New File"
            },
            {
                type: "separator"
            },
            {
                label: "Open"
            },
            {
                label: "Save"
            },
            {
                label: "Save as"
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
            }
        ]
    }
]

export function generateMenu() : Electron.Menu {
    let menu = Menu.buildFromTemplate(menuTemplate);

    menu.append(new MenuItem("File"));

    return menu;
}
