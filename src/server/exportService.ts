import * as Electron from "electron"
import {BrowserWindow} from "electron"
import * as path from "path"

let exportHTMLString: string = "";

export function initializeExportService() {

    Electron.ipcMain.on("export-html", (event: Electron.IpcMainEvent, data: string) => {

        exportHTMLString = data;

        let win: any = new BrowserWindow({
            width: 450, 
            height : 600,
            minWidth: 300,
            minHeight: 400,
            icon: path.join(__dirname, "../assets", "mde-logo-bg-sm.png"),
        });

        let htmlPath = "file://" + path.join(__dirname, "../../exportHTML.html");
        win.loadURL(htmlPath);

        win.on('closed', () => {
            win = null;
        })
        win.openDevTools();

    });

    Electron.ipcMain.on("get-export-html", (event: Electron.IpcMainEvent, id: any) => {

        event.sender.send("get-export-html-reply", id, exportHTMLString);

    })

}
