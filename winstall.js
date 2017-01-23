var electronInstaller = require("electron-winstaller");

var resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: "./dist/win-unpacked",
    outputDirectory: "./dist",
    authors: "DZ Chan",
    exe: "myapp.exe",
    title: "MDE",
    name: "MDE",
    iconUrl: "./build_resources/icon.ico",
    setupIcon: "./build_resources/icon.ico",
    certificateFile: "../MyKey.pfx"
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
