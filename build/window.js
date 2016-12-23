"use strict";
const electron_1 = require("electron");
const Server = require("./server");
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 300,
        minHeight: 300,
    });
    win.loadURL("file://" + __dirname + "/../index.html");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFpQyxVQUNqQyxDQUFDLENBRDBDO0FBQzNDLE1BQVksTUFBTSxXQUFNLFVBRXhCLENBQUMsQ0FGaUM7QUFFbEMsSUFBSSxHQUFHLENBQUM7QUFFUjtJQUNJLEdBQUcsR0FBRyxJQUFJLHdCQUFhLENBQUM7UUFDcEIsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUcsR0FBRztRQUNaLFFBQVEsRUFBRSxHQUFHO1FBQ2IsU0FBUyxFQUFFLEdBQUc7S0FDakIsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUM7SUFJdEQsTUFBTSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7SUFDNUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRS9CLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGNBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzlCLGNBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUU7SUFDeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLGNBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQ2YsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDZixZQUFZLEVBQUUsQ0FBQztJQUNuQixDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoid2luZG93LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
