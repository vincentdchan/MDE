"use strict";
const fs = require("fs");
const path = require("path");
const electron_1 = require("electron");
let localesMapper = {
    "zh": "chs",
    "zh-CN": "chs",
};
let items = null;
function init() {
    let locales = electron_1.remote.getGlobal("appLocales");
    let folderName = localesMapper[locales];
    if (folderName === undefined)
        folderName = "esn";
    let content = fs.readFileSync(path.join(__dirname, "../../../i18n/", folderName, "menu.i18n.json"), "utf8");
    items = JSON.parse(content);
    content =
        fs.readFileSync(path.join(__dirname, "../../../i18n/", folderName, "web.i18n.json"), "utf8");
    let web = JSON.parse(content);
    for (let name in web) {
        items[name] = web[name];
    }
}
class i18n {
    static getString(tag) {
        if (!items)
            init();
        return items[tag];
    }
}
exports.i18n = i18n;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2kxOG4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsdUNBQStCO0FBRy9CLElBQUksYUFBYSxHQUFHO0lBQ2hCLElBQUksRUFBRSxLQUFLO0lBQ1gsT0FBTyxFQUFFLEtBQUs7Q0FDakIsQ0FBQTtBQU1ELElBQUksS0FBSyxHQUFTLElBQUksQ0FBQztBQUl2QjtJQUNJLElBQUksT0FBTyxHQUFHLGlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTdDLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO1FBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUVqRCxJQUFJLE9BQU8sR0FDWCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTlGLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVCLE9BQU87UUFDUCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3RixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0FBQ0wsQ0FBQztBQU1EO0lBRUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFXO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBRUo7QUFQRCxvQkFPQyIsImZpbGUiOiJ1dGlsL2kxOG4vaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
