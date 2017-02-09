"use strict";
const electron_1 = require("electron");
const path = require("path");
const Server = require("./server");
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 300,
        minHeight: 400,
        icon: path.join(__dirname, "../assets", "mde-logo-bg-sm.png"),
    });
    win.loadURL("file://" + __dirname + "/../index.html");
    win.webContents.openDevTools();
    global["appLocales"] = electron_1.app.getLocale();
    Server.initializeLocalesWindowService(electron_1.app.getLocale());
    Server.initializeMarkdownTokenizerService();
    Server.initializeBrowserWindowService(win);
    Server.initializeDialogService();
    Server.initializeFileService();
    win.on('closed', () => {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVDQUFtRDtBQUNuRCw2QkFBNEI7QUFDNUIsbUNBQWtDO0FBRWxDLElBQUksR0FBRyxDQUFDO0FBRVI7SUFFSSxHQUFHLEdBQUcsSUFBSSx3QkFBYSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFHLEdBQUc7UUFDWixRQUFRLEVBQUUsR0FBRztRQUNiLFNBQVMsRUFBRSxHQUFHO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQztLQUNoRSxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztJQUV0RCxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRS9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxjQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdkMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLGNBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO0lBQzVDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUUvQixHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxjQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM5QixjQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFO0lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoQyxjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUNmLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7SUFDbkIsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6IndpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
