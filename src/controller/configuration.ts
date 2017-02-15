import {i18n as $} from "../util"
import {Config, ConfigTab, ConfigItemType, ConfigItem} from "../model/configuration"
import {MDE} from "."
import {app} from "electron"
import * as path from "path"
import * as fs from "fs"

export function configurationThunk(mde: MDE) : Config {
    return {
        "general": {
            label: $.getString("config.general"),
            items: {
                "language": {
                    label: $.getString("config.general.language"),
                    type: ConfigItemType.Options,
                    options: [{ 
                        name: "chs",
                        label: $.getString("config.general.language.chs"),
                    }, {
                        name: "esn",
                        label: $.getString("config.general.language.esn")
                    }],
                    value: "chs"
                },
                "showLineNumber": {
                    label: $.getString("config.general.showLineNumber"),
                    type: ConfigItemType.Checkbox,
                }
            }
        }, 
        "style": {
            label: $.getString("config.style"),
            items: {
                "fontSize": {
                    label: $.getString("config.style.fontSize"),
                    type: ConfigItemType.Radio,
                    options: [ {
                        name: "big",
                        label: $.getString("config.style.fontSize.big"),
                    }, {
                        name: "normal",
                        label: $.getString("config.style.fontSize.normal"),
                    }, {
                        name: "small",
                        label: $.getString("config.style.fontSize.small"),
                    }],
                    value: "normal",
                }, 
                "lineHeight": {
                    label: $.getString("config.style.lineHeight"),
                    type: ConfigItemType.Text,
                    value: "18",
                }
            }
        }
    }
}

export namespace Configuration {

    function getDefaultPath(): string {
        let userDefaultData = app.getPath("userData");
        return path.join(userDefaultData, "config.json");
    }

    export function loadConfigFromDefaultPath(config: Config) : boolean {
        return loadConfigFromPath(getDefaultPath(), config);
    }

    export function loadConfigFromPath(_path: string, config: Config): boolean {
        console.log("load user data from:", _path);
        let content = fs.readFileSync(_path, "utf8");
        let obj = JSON.parse(content);

        for (let tabName in config) {
            let configTab = config[tabName];

            if (tabName in obj) {
                let tabObj = obj[tabName];

                for (let itemName in configTab.items) {
                    let configItem = configTab.items[itemName];

                    if (itemName in tabObj) {
                        let itemObj = tabObj[itemName];

                        configItem.value = itemObj;
                    } else {
                        console.log("Can not find item \"", itemName, "\" in tab \"", tabName, "\" in config file.");
                    }

                }

            } else {
                console.log("Can not find tab \"", tabName, "\" in config file.");
            }
        }

        return true;
    }

    export function saveConfigToDefaultPath(config: Config) : boolean {
        return saveConfigToPath(getDefaultPath(), config);
    }

    export function saveConfigToPath(_path: string, config: Config) : boolean {
        var obj: any = {};

        for (let tabName in config) {
            let configTab = config[tabName];
            let subObj = {};

            for (let itemName in configTab.items) {
                let configItem = configTab.items[itemName];

                subObj[itemName] = configItem.value;
            }

            obj[tabName] = subObj;
        }

        let content = JSON.stringify(obj);

        fs.writeFileSync(_path, content, {
            encoding: "utf8"
        });
        return true;
    }

    export class ConfigTabNotFoundError extends Error {

        private _tabName: string;

        constructor(tabName: string) {
            super("TabNotFoundError: " + tabName);

            this._tabName = tabName;
        }

        get tabName() { return this._tabName; }

    }

    export class ConfigItemNotFoundError extends Error {

        private _itemName: string;

        constructor(itemName: string) {
            super("ItemNameNotFound: " + itemName);

            this._itemName = itemName;
        }

        get itemName() { return this._itemName; }

    }

}
