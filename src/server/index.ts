import * as Electron from "electron"
import * as fs from "fs"

export function initializeFileService() {

    Electron.ipcMain.on("file-open", (event: Electron.IpcMainEvent, path: string, flags: string, mode?: number) => {
        fs.open(path, flags, mode, (err: NodeJS.ErrnoException, fd: number) => {
            if (err) {
                event.sender.send("file-open-error", err);
            } else {
                event.sender.send("file-open-success", fd);
            }
        });
    });

    Electron.ipcMain.on("file-readFile", (event: Electron.IpcMainEvent, filename: string, encoding: string) => {
        fs.readFile(filename, encoding, (err: NodeJS.ErrnoException, data: string) => {
            if (err)
                event.sender.send("file-readFile-error", err);
            else
                event.sender.send("file-readFile-success", data);
        });
    });

    Electron.ipcMain.on("file-read", (event: Electron.IpcMainEvent, fd: number, buffer: Buffer, offset: number, 
        length: number, position: number) => {

        fs.read(fd, buffer, offset, length, position, (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => {
            if (err)
                event.sender.send("file-read-error", err);
            else
                event.sender.send("file-read-success", bytesRead, buffer);
        })
    });

    Electron.ipcMain.on("file-writeFile", (event: Electron.IpcMainEvent, filename: string, data: string | Buffer, options?: string) => {
        function callback(err: NodeJS.ErrnoException) {
            if (err)
                event.sender.send("file-wirteFile-error", err);
            else
                event.sender.send("file-writeFile-success");
        }
        if (options) {
            fs.writeFile("filename", data, options, callback);
        }
    });

    Electron.ipcMain.on("file-write-string", (event: Electron.IpcMainEvent, fd: number, data: string, position: number, encoding: string) => {
        fs.write(fd, data, position, (err: NodeJS.ErrnoException, bytes: number, str: string) => {
            if (err)
                event.sender.send("file-write-string-error", err);
            else
                event.sender.send("file-write-string-success", bytes, str);
        })
    });

    Electron.ipcMain.on("file-write-buffer", (event: Electron.IpcMainEvent, fd: number, data: Buffer, 
        offset:number, length: number, position: number)=> {

    fs.write(fd, data, offset, length, position, (err: NodeJS.ErrnoException, bytes: number, buffer: Buffer) => {
        if (err)
                event.sender.send("file-wirte-buffer-error", err);
        else
                event.sender.send("file-write-buffer-success", bytes, buffer);
    })
    });

}
