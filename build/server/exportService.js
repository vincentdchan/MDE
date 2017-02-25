"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const electron_1 = require("electron");
const path = require("path");
let exportHTMLString = "";
function initializeExportService() {
    Electron.ipcMain.on("export-html", (event, data) => {
        exportHTMLString = data;
        let win = new electron_1.BrowserWindow({
            width: 450,
            height: 450,
            minWidth: 300,
            minHeight: 400,
            icon: path.join(__dirname, "../../assets", "mde-logo-bg-sm.png"),
        });
        let htmlPath = "file://" + path.join(__dirname, "../../exportHTML.html");
        win.loadURL(htmlPath);
        win.on('closed', () => {
            win = null;
        });
        win.openDevTools();
    });
    Electron.ipcMain.on("get-export-html", (event, id) => {
        event.sender.send("get-export-html-reply", id, exportHTMLString);
    });
}
exports.initializeExportService = initializeExportService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvZXhwb3J0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEMsNkJBQTRCO0FBRTVCLElBQUksZ0JBQWdCLEdBQVcsRUFBRSxDQUFDO0FBRWxDO0lBRUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBNEIsRUFBRSxJQUFZO1FBRTFFLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLEdBQUcsR0FBUSxJQUFJLHdCQUFhLENBQUM7WUFDN0IsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUcsR0FBRztZQUNaLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLEdBQUc7WUFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixDQUFDO1NBQ25FLENBQUMsQ0FBQztRQUVILElBQUksUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUE7UUFDRixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBTztRQUV6RSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVyRSxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUM7QUE5QkQsMERBOEJDIiwiZmlsZSI6InNlcnZlci9leHBvcnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
