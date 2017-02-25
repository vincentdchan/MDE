"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class Host {
    static init() {
        if (!Host.inited) {
            electron_1.ipcRenderer.on("getLocales-reply", (event, data) => {
                Host.locales = data;
                Host.waiting_locales.forEach((fun) => {
                    fun(data);
                });
            });
            electron_1.ipcRenderer.on("tokenizeLine-reply", (event, id, tokens, state) => {
                if (Host.mapper[id]) {
                    Host.mapper[id].resolve(tokens, state);
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("dialog-showOpenDialog-reply", (event, id, filenames) => {
                if (Host.mapper[id]) {
                    Host.mapper[id].resolve(filenames);
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("dialog-showSaveDialog-reply", (event, id, filename) => {
                if (Host.mapper[id]) {
                    Host.mapper[id].resolve(filename);
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("dialog-showMessageBox-reply", (event, id, resp) => {
                if (Host.mapper[id]) {
                    Host.mapper[id].resolve(resp);
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("file-readFile-reply", (event, id, err, data) => {
                if (Host.mapper[id]) {
                    if (err) {
                        Host.mapper[id].reject(err);
                    }
                    else {
                        Host.mapper[id].resolve(data);
                    }
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("file-writeFile-reply", (event, id, err) => {
                if (Host.mapper[id]) {
                    if (err) {
                        Host.mapper[id].reject(err);
                    }
                    else {
                        Host.mapper[id].resolve(true);
                    }
                    Host.mapper[id] = null;
                }
            });
            electron_1.ipcRenderer.on("get-export-html-reply", (event, id, data) => {
                if (Host.mapper[id]) {
                    Host.mapper[id].resolve(data);
                    Host.mapper[id] = null;
                }
            });
            Host.inited = true;
        }
    }
    static showOpenDialog(options) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            electron_1.ipcRenderer.send("dialog-showOpenDialog", id, options);
            Host.mapper[id] = { resolve: accept, reject: reject };
        });
    }
    static showSaveDialog(options) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            electron_1.ipcRenderer.send("dialog-showSaveDialog", id, options);
            Host.mapper[id] = { resolve: accept, reject: reject };
        });
    }
    static showMessageBox(options) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            electron_1.ipcRenderer.send("dialog-showMessageBox", id, options);
            Host.mapper[id] = { resolve: accept, reject: reject };
        });
    }
    static readFile(filename, encoding) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            electron_1.ipcRenderer.send("file-readFile", id, filename, encoding);
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            };
        });
    }
    static writeStringToFile(filename, encoding, content) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            electron_1.ipcRenderer.send("file-writeFile", id, filename, content, {
                encoding: encoding
            });
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            };
        });
    }
    static getLocales() {
        Host.init();
        return new Promise((resolve, reject) => {
            if (Host.locales) {
                resolve(Host.locales);
                return;
            }
            Host.waiting_locales.push(resolve);
            electron_1.ipcRenderer.send("getLocales");
        });
    }
    static asyncTokenizeLine(copyState, content, callback) {
        Host.init();
        let id = Host.idCounter++;
        electron_1.ipcRenderer.send("tokenizeLine", id, copyState, content);
        Host.mapper[id] = {
            resolve: callback,
            reject: null,
        };
    }
    static openDevTools() {
        electron_1.ipcRenderer.send("window-openDevTools");
    }
    static reload() {
        electron_1.ipcRenderer.send("window-reload");
    }
    static exportHTML(data) {
        electron_1.ipcRenderer.send("export-html", data);
    }
    static getExportHTML() {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            electron_1.ipcRenderer.send("get-export-html", id);
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            };
        });
    }
}
Host.idCounter = 0;
Host.mapper = {};
Host.locales = null;
Host.waiting_locales = [];
Host.inited = false;
exports.Host = Host;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
