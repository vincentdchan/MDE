"use strict";
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
