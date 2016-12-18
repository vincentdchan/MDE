"use strict";
const electron_1 = require("electron");
const tokenizer_1 = require("../server/tokenizer");
class Host {
    static init() {
        if (!Host.inited) {
            Host.render_process = tokenizer_1.initializeMarkdownTokenizerService();
            Host.render_process.send("something");
            Host.render_process.on("message", (msg) => {
                switch (msg.type) {
                    case "tokenizeLine":
                        if (Host.mapper[msg.data.id]) {
                            Host.mapper[msg.data.id].resolve(msg.data.tokens, msg.data.tokenizeState);
                            Host.mapper[msg.data.id] = null;
                        }
                        break;
                }
            });
            Host.render_process.on("error", (error) => {
                console.log(error);
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
    static tokenizeLine(copyState, content) {
        Host.init();
        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            console.log(Host.render_process);
            Host.render_process.send({
                type: "tokenizeLine",
                data: {
                    id: id,
                    state: copyState,
                    content: content,
                }
            });
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            };
        });
    }
    static openDevTools() {
        electron_1.ipcRenderer.send("window-openDevTools");
    }
    static reload() {
        electron_1.ipcRenderer.send("window-reload");
    }
}
Host.idCounter = 0;
Host.mapper = {};
Host.render_process = null;
Host.inited = false;
exports.Host = Host;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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
