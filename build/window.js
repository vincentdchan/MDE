"use strict";
const electron_1 = require("electron");
const server_1 = require("./server");
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 300,
        minHeight: 300,
    });
    win.loadURL("file://" + __dirname + "/../index.html");
    win.webContents.openDevTools();
    server_1.initializeFileService();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLDJCQUFpQyxVQUNqQyxDQUFDLENBRDBDO0FBQzNDLHlCQUFvQyxVQUVwQyxDQUFDLENBRjZDO0FBRTlDLElBQUksR0FBRyxDQUFDO0FBRVI7SUFDSSxHQUFHLEdBQUcsSUFBSSx3QkFBYSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFHLEdBQUc7UUFDWixRQUFRLEVBQUUsR0FBRztRQUNiLFNBQVMsRUFBRSxHQUFHO0tBQ2pCLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRXRELEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFL0IsOEJBQXFCLEVBQUUsQ0FBQztJQUV4QixHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxjQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM5QixjQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFO0lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoQyxjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUNmLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7SUFDbkIsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6IndpbmRvdy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
