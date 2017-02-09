"use strict";
const Electron = require("electron");
const electron_1 = require("electron");
const fs = require("fs");
var tokenizer_1 = require("./tokenizer");
exports.initializeMarkdownTokenizerService = tokenizer_1.initializeMarkdownTokenizerService;
var render_1 = require("./render");
exports.renderServer = render_1.default;
function initializeLocalesWindowService(locales) {
    Electron.ipcMain.on("getLocales", (event) => {
        event.sender.send("getLocales-reply", locales);
    });
}
exports.initializeLocalesWindowService = initializeLocalesWindowService;
function initializeBrowserWindowService(bw) {
    Electron.ipcMain.on("window-openDevTools", (event, options) => {
        bw.webContents.openDevTools(options);
    });
    Electron.ipcMain.on("window-reload", (event) => {
        bw.reload();
    });
}
exports.initializeBrowserWindowService = initializeBrowserWindowService;
function initializeDialogService() {
    Electron.ipcMain.on("dialog-showOpenDialog", (event, id, options) => {
        electron_1.dialog.showOpenDialog(options, (filenames) => {
            event.sender.send("dialog-showOpenDialog-reply", id, filenames);
        });
    });
    Electron.ipcMain.on("dialog-showSaveDialog", (event, id, options) => {
        electron_1.dialog.showSaveDialog(options, (filename) => {
            event.sender.send("dialog-showSaveDialog-reply", id, filename);
        });
    });
    Electron.ipcMain.on("dialog-showMessageBox", (event, id, options) => {
        electron_1.dialog.showMessageBox(options, (response) => {
            event.sender.send("dialog-showMessageBox-reply", id, response);
        });
    });
}
exports.initializeDialogService = initializeDialogService;
function initializeFileService() {
    Electron.ipcMain.on("file-open", (event, id, path, flags, mode) => {
        fs.open(path, flags, mode, (err, fd) => {
            event.sender.send("file-open-reply", id, err, fd);
        });
    });
    Electron.ipcMain.on("file-readFile", (event, id, filename, encoding) => {
        fs.readFile(filename, encoding, (err, data) => {
            event.sender.send("file-readFile-reply", id, err, data);
        });
    });
    Electron.ipcMain.on("file-read", (event, id, fd, buffer, offset, length, position) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
            event.sender.send("file-read-reply", id, err, bytesRead, buffer);
        });
    });
    Electron.ipcMain.on("file-writeFile", (event, id, filename, data, options) => {
        function callback(err) {
            event.sender.send("file-writeFile-reply", id, err);
        }
        if (options) {
            fs.writeFile(filename, data, options, callback);
        }
        else {
            fs.writeFile(filename, data, callback);
        }
    });
    Electron.ipcMain.on("file-write-string", (event, id, fd, data, position, encoding) => {
        fs.write(fd, data, position, (err, bytes, str) => {
            event.sender.send("file-write-string-reply", id, err, bytes, str);
        });
    });
    Electron.ipcMain.on("file-write-buffer", (event, id, fd, data, offset, length, position) => {
        fs.write(fd, data, offset, length, position, (err, bytes, buffer) => {
            event.sender.send("file-write-buffer-reply", id, err, bytes, buffer);
        });
    });
}
exports.initializeFileService = initializeFileService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
