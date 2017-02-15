"use strict";
const fs = require("fs");
const path = require("path");
const electron_1 = require("electron");
let localesMapper = {
    "zh": "chs",
    "zh-CN": "chs",
};
let items = null;
class i18n {
    static getCurrentLoacles() {
        return electron_1.remote.getGlobal("appLocales");
    }
    static getDefaultLanguage() {
        return localesMapper[i18n.getCurrentLoacles()];
    }
    static InitializeI18n(language) {
        if (language === undefined)
            language = "esn";
        let content = fs.readFileSync(path.join(__dirname, "../../../i18n/", language, "menu.i18n.json"), "utf8");
        items = JSON.parse(content);
        content =
            fs.readFileSync(path.join(__dirname, "../../../i18n/", language, "web.i18n.json"), "utf8");
        let web = JSON.parse(content);
        for (let name in web) {
            items[name] = web[name];
        }
    }
    static getString(tag) {
        if (!items)
            throw new I18nNotInitializeError();
        return items[tag];
    }
}
exports.i18n = i18n;
class I18nNotInitializeError extends Error {
    constructor() {
        super("i18n service is not initialized");
    }
}
exports.I18nNotInitializeError = I18nNotInitializeError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2kxOG4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsdUNBQStCO0FBRy9CLElBQUksYUFBYSxHQUFHO0lBQ2hCLElBQUksRUFBRSxLQUFLO0lBQ1gsT0FBTyxFQUFFLEtBQUs7Q0FDakIsQ0FBQTtBQU1ELElBQUksS0FBSyxHQUFTLElBQUksQ0FBQztBQVl2QjtJQUVJLE1BQU0sQ0FBQyxpQkFBaUI7UUFDcEIsTUFBTSxDQUFDLGlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQUMsa0JBQWtCO1FBQ3JCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFTO1FBTTNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUM7WUFBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTdDLElBQUksT0FBTyxHQUNQLEVBQUUsQ0FBQyxZQUFZLENBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEYsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUIsT0FBTztZQUNILEVBQUUsQ0FBQyxZQUFZLENBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRW5GLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFXO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBRUo7QUF2Q0Qsb0JBdUNDO0FBRUQsNEJBQW9DLFNBQVEsS0FBSztJQUU3QztRQUNJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FFSjtBQU5ELHdEQU1DIiwiZmlsZSI6InV0aWwvaTE4bi9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
