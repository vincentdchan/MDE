"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    Server.initializeExportService();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBbUQ7QUFDbkQsNkJBQTRCO0FBQzVCLG1DQUFrQztBQUVsQyxJQUFJLEdBQUcsQ0FBQztBQUVSO0lBRUksR0FBRyxHQUFHLElBQUksd0JBQWEsQ0FBQztRQUNwQixLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRyxHQUFHO1FBQ1osUUFBUSxFQUFFLEdBQUc7UUFDYixTQUFTLEVBQUUsR0FBRztRQUNkLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLENBQUM7S0FDaEUsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUM7SUFFdEQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUUvQixNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsY0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxjQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztJQUM1QyxNQUFNLENBQUMsOEJBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFFakMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsY0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDOUIsY0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRTtJQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEMsY0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDZixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO0lBQ25CLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJ3aW5kb3cuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
