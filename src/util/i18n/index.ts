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

// console.log(path.join(__dirname, "../../../i18n/", "chs", "menu.i18n.json"))

function init() {
    let locales = remote.getGlobal("appLocales");

    let folderName = localesMapper[locales];
    if (folderName === undefined) folderName = "esn";

    let content = 
    fs.readFileSync(path.join(__dirname, "../../../i18n/", folderName, "menu.i18n.json"), "utf8");

    items = JSON.parse(content);

    content = 
    fs.readFileSync(path.join(__dirname, "../../../i18n/", folderName, "web.i18n.json"), "utf8");

    let web = JSON.parse(content);
    for (let name in web) {
        items[name] = web[name];
    }
}

/**
 * The editor will auto load the locals json file, just use
 * `getString` method to get the string.
 */
export class i18n {

    static getString(tag: string): string {
        if (!items) init();
        return items[tag];
    }

}
