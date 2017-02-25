"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const electron_1 = require("electron");
const fs = require("fs");
var tokenizer_1 = require("./tokenizer");
exports.initializeMarkdownTokenizerService = tokenizer_1.initializeMarkdownTokenizerService;
var exportService_1 = require("./exportService");
exports.initializeExportService = exportService_1.initializeExportService;
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
