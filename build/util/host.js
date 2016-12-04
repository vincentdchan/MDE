"use strict";
const electron_1 = require("electron");
class Host {
    static init() {
        if (!Host.inited) {
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
    static openDevTools() {
        electron_1.ipcRenderer.send("window-openDevTools");
    }
    static reload() {
        electron_1.ipcRenderer.send("window-reload");
    }
}
Host.idCounter = 0;
Host.mapper = {};
Host.inited = false;
exports.Host = Host;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUc7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxPQUFPLFlBQVk7UUFDZixzQkFBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPLE1BQU07UUFDVCxzQkFBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0QyxDQUFDO0FBRUwsQ0FBQztBQWhHa0IsY0FBUyxHQUFHLENBQUMsQ0FBQztBQUNkLFdBQU0sR0FBNkQsRUFBRSxDQUFDO0FBRXRFLFdBQU0sR0FBRyxLQUFLLENBQUM7QUFMckIsWUFBSSxPQWtHaEIsQ0FBQSIsImZpbGUiOiJ1dGlsL2hvc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
