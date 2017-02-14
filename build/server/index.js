"use strict";
const Electron = require("electron");
const electron_1 = require("electron");
const fs = require("fs");
var tokenizer_1 = require("./tokenizer");
exports.initializeMarkdownTokenizerService = tokenizer_1.initializeMarkdownTokenizerService;
var exportService_1 = require("./exportService");
exports.initializeExportService = exportService_1.initializeExportService;
var render_1 = require("./render");
exports.renderServer = render_1.default;
function initializeLocalesWindowService(locales) {
    Electron.ipcMain.on("getLocales", (event) => {
        event.sender.send("getLocales-reply", locales);
    });
}
exports.initializeLocalesWindowService = initializeLocalesWindowService;
function initializeBrowserWindowService(bw) {
    Electron.ipcMain.on("window-openDevTools", (event, options) => {
        bw.webContents.openDevTools(options);
    });
    Electron.ipcMain.on("window-reload", (event) => {
        bw.reload();
    });
}
exports.initializeBrowserWindowService = initializeBrowserWindowService;
function initializeDialogService() {
    Electron.ipcMain.on("dialog-showOpenDialog", (event, id, options) => {
        electron_1.dialog.showOpenDialog(options, (filenames) => {
            event.sender.send("dialog-showOpenDialog-reply", id, filenames);
        });
    });
    Electron.ipcMain.on("dialog-showSaveDialog", (event, id, options) => {
        electron_1.dialog.showSaveDialog(options, (filename) => {
            event.sender.send("dialog-showSaveDialog-reply", id, filename);
        });
    });
    Electron.ipcMain.on("dialog-showMessageBox", (event, id, options) => {
        electron_1.dialog.showMessageBox(options, (response) => {
            event.sender.send("dialog-showMessageBox-reply", id, response);
        });
    });
}
exports.initializeDialogService = initializeDialogService;
function initializeFileService() {
    Electron.ipcMain.on("file-open", (event, id, path, flags, mode) => {
        fs.open(path, flags, mode, (err, fd) => {
            event.sender.send("file-open-reply", id, err, fd);
        });
    });
    Electron.ipcMain.on("file-readFile", (event, id, filename, encoding) => {
        fs.readFile(filename, encoding, (err, data) => {
            event.sender.send("file-readFile-reply", id, err, data);
        });
    });
    Electron.ipcMain.on("file-read", (event, id, fd, buffer, offset, length, position) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
            event.sender.send("file-read-reply", id, err, bytesRead, buffer);
        });
    });
    Electron.ipcMain.on("file-writeFile", (event, id, filename, data, options) => {
        function callback(err) {
            event.sender.send("file-writeFile-reply", id, err);
        }
        if (options) {
            fs.writeFile(filename, data, options, callback);
        }
        else {
            fs.writeFile(filename, data, callback);
        }
    });
    Electron.ipcMain.on("file-write-string", (event, id, fd, data, position, encoding) => {
        fs.write(fd, data, position, (err, bytes, str) => {
            event.sender.send("file-write-string-reply", id, err, bytes, str);
        });
    });
    Electron.ipcMain.on("file-write-buffer", (event, id, fd, data, offset, length, position) => {
        fs.write(fd, data, offset, length, position, (err, bytes, buffer) => {
            event.sender.send("file-write-buffer-reply", id, err, bytes, buffer);
        });
    });
}
exports.initializeFileService = initializeFileService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFvQztBQUNwQyx1Q0FBK0I7QUFDL0IseUJBQXdCO0FBQ3hCLHlDQUE4RDtBQUF0RCx5REFBQSxrQ0FBa0MsQ0FBQTtBQUMxQyxpREFBdUQ7QUFBL0Msa0RBQUEsdUJBQXVCLENBQUE7QUFDL0IsbUNBQWlEO0FBQXpDLGdDQUFBLE9BQU8sQ0FBaUI7QUFFaEMsd0NBQStDLE9BQWU7SUFFMUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBNEI7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUE7QUFFTixDQUFDO0FBTkQsd0VBTUM7QUFFRCx3Q0FBK0MsRUFBMEI7SUFFckUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUE0QixFQUFFLE9BQWE7UUFDbkYsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUE0QjtRQUM5RCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDO0FBVkQsd0VBVUM7QUFFRDtJQUVJLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFPLEVBQUUsT0FBbUM7UUFFcEgsaUJBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBbUI7WUFDL0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBTyxFQUFFLE9BQW1DO1FBRXBILGlCQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQWdCO1lBQzVDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQU8sRUFBRSxPQUF1QztRQUV4SCxpQkFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFnQjtZQUM1QyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUMsQ0FBQTtBQUVOLENBQUM7QUExQkQsMERBMEJDO0FBRUQ7SUFFSSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQU8sRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLElBQWE7UUFFL0csRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQTBCLEVBQUUsRUFBVTtZQUM5RCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQU8sRUFBRSxRQUFnQixFQUFFLFFBQWdCO1FBRTNHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQTBCLEVBQUUsSUFBWTtZQUNyRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQU8sRUFBRSxFQUFVLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFDL0csTUFBYyxFQUFFLFFBQWdCO1FBRWhDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQTBCLEVBQUUsU0FBaUIsRUFBRSxNQUFjO1lBQ3hHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQTRCLEVBQUUsRUFBTyxFQUFFLFFBQWdCLEVBQUUsSUFBcUIsRUFBRSxPQUFnQjtRQUNuSSxrQkFBa0IsR0FBMEI7WUFDeEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQU8sRUFBRSxFQUFVLEVBQUUsSUFBWSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7UUFFekksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQTBCLEVBQUUsS0FBYSxFQUFFLEdBQVc7WUFDaEYsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFPLEVBQUUsRUFBVSxFQUFFLElBQVksRUFDckcsTUFBYSxFQUFFLE1BQWMsRUFBRSxRQUFnQjtRQUUvQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUEwQixFQUFFLEtBQWEsRUFBRSxNQUFjO1lBQ25HLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDO0FBeERELHNEQXdEQyIsImZpbGUiOiJzZXJ2ZXIvaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
