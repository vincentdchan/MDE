import * as Electron from "electron"
import {ipcRenderer} from "electron"
import {MarkdownTokenizeState, MarkdownTokenType} from "."
import {MarkdownToken} from "../controller"
import {initializeMarkdownTokenizerService} from "../server/tokenizer"
import * as child_process from "child_process"

export class Host {

    private static idCounter = 0;
    private static mapper : {[name: number]: {resolve: Function, reject: Function}} = {};

    private static render_process: child_process.ChildProcess = null;

    private static inited = false;
    private static init() {
        if (!Host.inited) {

            Host.render_process = initializeMarkdownTokenizerService();
            Host.render_process.send("something");

            Host.render_process.on("message", (msg: {type: string, data: {id: number, tokens: any, tokenizeState: any}}) => {
                switch(msg.type) {
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
            })

            ipcRenderer.on("dialog-showOpenDialog-reply", 
                (event: Electron.IpcRendererEvent, id: number, filenames: string[]) => {
                    if (Host.mapper[id]) {
                        Host.mapper[id].resolve(filenames);
                        Host.mapper[id] = null;
                    }
                });
            
            ipcRenderer.on("dialog-showSaveDialog-reply",
                (event: Electron.IpcRendererEvent, id: number, filename: string) => {
                    if (Host.mapper[id]) {
                        Host.mapper[id].resolve(filename);
                        Host.mapper[id] = null;
                    }
                });

            ipcRenderer.on("dialog-showMessageBox-reply",
                (event: Electron.IpcRendererEvent, id: number, resp: number) => {
                    if (Host.mapper[id]) {
                        Host.mapper[id].resolve(resp);
                        Host.mapper[id] = null;
                    }
                });

            ipcRenderer.on("file-readFile-reply",
                (event: Electron.IpcRendererEvent, id: number, err: NodeJS.ErrnoException, data: string) => {
                    if (Host.mapper[id]) {
                        if (err) {
                            Host.mapper[id].reject(err);
                        } else {
                            Host.mapper[id].resolve(data);
                        }
                        Host.mapper[id] = null;
                    }
                });

            ipcRenderer.on("file-writeFile-reply",
                (event: Electron.IpcRendererEvent, id: number, err: NodeJS.ErrnoException) => {
                    if (Host.mapper[id]) {
                        if (err) {
                            Host.mapper[id].reject(err);
                        } else {
                            Host.mapper[id].resolve(true);
                        }
                        Host.mapper[id] = null;
                    }
                });

            Host.inited = true;
        }
    }

    static showOpenDialog(options: Electron.OpenDialogOptions) : Promise<string[]> {
        Host.init();

        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            ipcRenderer.send("dialog-showOpenDialog", id, options);
            Host.mapper[id] = {resolve: accept, reject: reject};
        });
    }

    static showSaveDialog(options: Electron.SaveDialogOptions) : Promise<string> {
        Host.init();

        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            ipcRenderer.send("dialog-showSaveDialog", id, options);
            Host.mapper[id] = {resolve: accept, reject: reject};
        });
    }

    static showMessageBox(options: Electron.ShowMessageBoxOptions) : Promise<number> {
        Host.init();

        let id = Host.idCounter++;
        return new Promise((accept, reject) => {
            ipcRenderer.send("dialog-showMessageBox", id, options);
            Host.mapper[id] = {resolve: accept, reject: reject};
        });
    }

    static readFile(filename: string, encoding: string) : Promise<string> {
        Host.init();

        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            ipcRenderer.send("file-readFile", id, filename, encoding);
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            }
        });
    }

    static writeStringToFile(filename: string, encoding: string, content: string) : Promise<true> {
        Host.init();

        let id = Host.idCounter++;
        return new Promise((resolve, reject) => {
            ipcRenderer.send("file-writeFile", id, filename, content, {
                encoding: encoding
            });
            Host.mapper[id] = {
                resolve: resolve,
                reject: reject,
            }
        });
    }

    static tokenizeLine(copyState: MarkdownTokenizeState, content: string) : 
        Promise<{token: MarkdownToken[], tokenizeState: MarkdownTokenizeState}> {

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
        ipcRenderer.send("window-openDevTools");
    }

    static reload() {
        ipcRenderer.send("window-reload");
    }

}
