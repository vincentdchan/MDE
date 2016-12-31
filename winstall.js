var electronInstaller = require("electron-winstaller");

var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "./",
    outputDirectory: "../output",
    authors: "DZ Chan",
    exe: "myapp.exe"
});
