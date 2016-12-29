import * as Electron from "electron"
import {dialog} from "electron"
import * as fs from "fs"
export {initializeMarkdownTokenizerService} from "./tokenizer"
export {default as  renderServer} from "./render"

export function initializeLocalesWindowService(locales: string) {

    Electron.ipcMain.on("getLocales", (event: Electron.IpcMainEvent) => {
        event.sender.send("getLocales-reply", locales);
    })

}

export function initializeBrowserWindowService(bw: Electron.BrowserWindow) {

    Electron.ipcMain.on("window-openDevTools", (event: Electron.IpcMainEvent, options?: any) => {
        bw.webContents.openDevTools(options);
    });

    Electron.ipcMain.on("window-reload", (event: Electron.IpcMainEvent) => {
        bw.reload();
    });

}

export function initializeDialogService() {

    Electron.ipcMain.on("dialog-showOpenDialog", (event: Electron.IpcMainEvent, id: any, options: Electron.OpenDialogOptions) => {

        dialog.showOpenDialog(options, (filenames: string[]) => {
            event.sender.send("dialog-showOpenDialog-reply", id, filenames);
        })

    });

    Electron.ipcMain.on("dialog-showSaveDialog", (event: Electron.IpcMainEvent, id: any, options: Electron.SaveDialogOptions) => {

        dialog.showSaveDialog(options, (filename: string) => {
            event.sender.send("dialog-showSaveDialog-reply", id, filename);
        })

    });

    Electron.ipcMain.on("dialog-showMessageBox", (event: Electron.IpcMainEvent, id: any, options: Electron.ShowMessageBoxOptions) => {

        dialog.showMessageBox(options, (response: number) => {
            event.sender.send("dialog-showMessageBox-reply", id, response);
        });

    })
    
}

export function initializeFileService() {

    Electron.ipcMain.on("file-open", (event: Electron.IpcMainEvent, id: any, path: string, flags: string, mode?: number) => {

        fs.open(path, flags, mode, (err: NodeJS.ErrnoException, fd: number) => {
            event.sender.send("file-open-reply", id, err, fd);
        });

    });

    Electron.ipcMain.on("file-readFile", (event: Electron.IpcMainEvent, id: any, filename: string, encoding: string) => {

        fs.readFile(filename, encoding, (err: NodeJS.ErrnoException, data: string) => {
            event.sender.send("file-readFile-reply", id, err, data);
        });

    });

    Electron.ipcMain.on("file-read", (event: Electron.IpcMainEvent, id: any, fd: number, buffer: Buffer, offset: number, 
        length: number, position: number) => {

        fs.read(fd, buffer, offset, length, position, (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => {
            event.sender.send("file-read-reply", id, err, bytesRead, buffer);
        })

    });

    Electron.ipcMain.on("file-writeFile", (event: Electron.IpcMainEvent, id: any, filename: string, data: string | Buffer, options?: string) => {
        function callback(err: NodeJS.ErrnoException) {
            event.sender.send("file-writeFile-reply", id, err);
        }

        if (options) {
            fs.writeFile(filename, data, options, callback);
        } else {
            fs.writeFile(filename, data, callback);
        }
    });

    Electron.ipcMain.on("file-write-string", (event: Electron.IpcMainEvent, id: any, fd: number, data: string, position: number, encoding: string) => {

        fs.write(fd, data, position, (err: NodeJS.ErrnoException, bytes: number, str: string) => {
            event.sender.send("file-write-string-reply", id, err, bytes, str);
        })

    });

    Electron.ipcMain.on("file-write-buffer", (event: Electron.IpcMainEvent, id: any, fd: number, data: Buffer, 
        offset:number, length: number, position: number)=> {

        fs.write(fd, data, offset, length, position, (err: NodeJS.ErrnoException, bytes: number, buffer: Buffer) => {
            event.sender.send("file-write-buffer-reply", id, err, bytes, buffer);
        })

    });

}
