"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2kxOG4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHVDQUErQjtBQUcvQixJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLEVBQUUsS0FBSztJQUNYLE9BQU8sRUFBRSxLQUFLO0NBQ2pCLENBQUE7QUFNRCxJQUFJLEtBQUssR0FBUyxJQUFJLENBQUM7QUFZdkI7SUFFSSxNQUFNLENBQUMsaUJBQWlCO1FBQ3BCLE1BQU0sQ0FBQyxpQkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGtCQUFrQjtRQUNyQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUztRQU0zQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO1lBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUU3QyxJQUFJLE9BQU8sR0FDUCxFQUFFLENBQUMsWUFBWSxDQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXBGLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVCLE9BQU87WUFDSCxFQUFFLENBQUMsWUFBWSxDQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVuRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBVztRQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUVKO0FBdkNELG9CQXVDQztBQUVELDRCQUFvQyxTQUFRLEtBQUs7SUFFN0M7UUFDSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBRUo7QUFORCx3REFNQyIsImZpbGUiOiJ1dGlsL2kxOG4vaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
