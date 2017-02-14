"use strict";
const Electron = require("electron");
const electron_1 = require("electron");
const path = require("path");
let exportHTMLString = "";
function initializeExportService() {
    Electron.ipcMain.on("export-html", (event, data) => {
        exportHTMLString = data;
        let win = new electron_1.BrowserWindow({
            width: 450,
            height: 600,
            minWidth: 300,
            minHeight: 400,
            icon: path.join(__dirname, "../assets", "mde-logo-bg-sm.png"),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvZXhwb3J0U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQW9DO0FBQ3BDLHVDQUFzQztBQUN0Qyw2QkFBNEI7QUFFNUIsSUFBSSxnQkFBZ0IsR0FBVyxFQUFFLENBQUM7QUFFbEM7SUFFSSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUE0QixFQUFFLElBQVk7UUFFMUUsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksR0FBRyxHQUFRLElBQUksd0JBQWEsQ0FBQztZQUM3QixLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRyxHQUFHO1lBQ1osUUFBUSxFQUFFLEdBQUc7WUFDYixTQUFTLEVBQUUsR0FBRztZQUNkLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLENBQUM7U0FDaEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDekUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQTtRQUNGLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV2QixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFPO1FBRXpFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXJFLENBQUMsQ0FBQyxDQUFBO0FBRU4sQ0FBQztBQTlCRCwwREE4QkMiLCJmaWxlIjoic2VydmVyL2V4cG9ydFNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
