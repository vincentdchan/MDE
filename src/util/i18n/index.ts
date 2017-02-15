import * as fs from "fs";
import * as path from "path";
import {remote} from "electron"
import {Host} from ".."

let localesMapper = {
    "zh": "chs",
    "zh-CN": "chs",
}

interface Item {
    [name: string] : string;
}

let items: Item = null;

/**
 * The editor will auto load the locals json file, just use
 * `getString` method to get the string.
 * 
 * ## Update v0.1.0
 * 
 * The i18n service will **not** load from file system from `0.1.0`,
 * just init it manually.
 * 
 */
export class i18n {

    static getCurrentLoacles() {
        return remote.getGlobal("appLocales");
    }

    static getDefaultLanguage(): string {
        return localesMapper[i18n.getCurrentLoacles()];
    }

    static InitializeI18n(language?) {
        /*
        locales = locales ? locales : remote.getGlobal("appLocales");

        let folderName = localesMapper[locales];
        */
        if (language === undefined) language = "esn";

        let content = 
            fs.readFileSync(
                path.join(__dirname, "../../../i18n/", language, "menu.i18n.json"), "utf8");

        items = JSON.parse(content);

        content = 
            fs.readFileSync(
                path.join(__dirname, "../../../i18n/", language, "web.i18n.json"), "utf8");

        let web = JSON.parse(content);
        for (let name in web) {
            items[name] = web[name];
        }
    }

    static getString(tag: string): string {
        if (!items) throw new I18nNotInitializeError();
        return items[tag];
    }

}

export class I18nNotInitializeError extends Error {

    constructor() {
        super("i18n service is not initialized");
    }

}

