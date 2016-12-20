"use strict";
const electron_1 = require("electron");
class Host {
    static init() {
        if (!Host.inited) {
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
}
Host.idCounter = 0;
Host.mapper = {};
Host.inited = false;
exports.Host = Host;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDJCQUEwQixVQUMxQixDQUFDLENBRG1DO0FBS3BDO0lBTUksT0FBZSxJQUFJO1FBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUVmLHNCQUFXLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLENBQUMsS0FBZ0MsRUFBRSxFQUFVLEVBQUUsTUFBdUIsRUFBRSxLQUE0QjtnQkFDckksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILHNCQUFXLENBQUMsRUFBRSxDQUFDLDZCQUE2QixFQUN4QyxDQUFDLEtBQWdDLEVBQUUsRUFBVSxFQUFFLFNBQW1CO2dCQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFUCxzQkFBVyxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsRUFDeEMsQ0FBQyxLQUFnQyxFQUFFLEVBQVUsRUFBRSxRQUFnQjtnQkFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRVAsc0JBQVcsQ0FBQyxFQUFFLENBQUMsNkJBQTZCLEVBQ3hDLENBQUMsS0FBZ0MsRUFBRSxFQUFVLEVBQUUsSUFBWTtnQkFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRVAsc0JBQVcsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQ2hDLENBQUMsS0FBZ0MsRUFBRSxFQUFVLEVBQUUsR0FBMEIsRUFBRSxJQUFZO2dCQUNuRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRVAsc0JBQVcsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQ2pDLENBQUMsS0FBZ0MsRUFBRSxFQUFVLEVBQUUsR0FBMEI7Z0JBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxDQUFDO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFUCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sY0FBYyxDQUFDLE9BQW1DO1FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUM5QixzQkFBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sY0FBYyxDQUFDLE9BQW1DO1FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUM5QixzQkFBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sY0FBYyxDQUFDLE9BQXVDO1FBQ3pELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTTtZQUM5QixzQkFBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8sUUFBUSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDOUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLHNCQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUc7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUE7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxPQUFPLGlCQUFpQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxPQUFlO1FBQ3hFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixzQkFBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtnQkFDdEQsUUFBUSxFQUFFLFFBQVE7YUFDckIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDZCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQTtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU8saUJBQWlCLENBQUMsU0FBZ0MsRUFBRSxPQUFlLEVBQ3RFLFFBQWdGO1FBRWhGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixzQkFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHO1lBQ2QsT0FBTyxFQUFFLFFBQVE7WUFDakIsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sWUFBWTtRQUNmLHNCQUFXLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU8sTUFBTTtRQUNULHNCQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7QUFFTCxDQUFDO0FBakprQixjQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsV0FBTSxHQUE2RCxFQUFFLENBQUM7QUFFdEUsV0FBTSxHQUFHLEtBQUssQ0FBQztBQUxyQixZQUFJLE9BbUpoQixDQUFBIiwiZmlsZSI6InV0aWwvaG9zdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
