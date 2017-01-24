import {i18n as $} from "../util"
import {Config, ConfigTab, ConfigItemType, ConfigItem} from "../view/viewConfig"
import {MDE} from "."
import {app} from "electron"
import * as path from "path"
import * as fs from "fs"

export function configurationThunk(mde: MDE) : Config {
    return {
        tabs: [{
                name: "general",
                label: $.getString("preference.tab.general"),
                items: [{
                    name: "test",
                    label: "Test 1",
                    type: ConfigItemType.Text,
                }, {
                    name: "test2",
                    label: "Test 2",
                    type: ConfigItemType.Checkbox,
                }]
            }, {
                name: "other",
                label: "Other",
                items: [{
                    name: "test2",
                    label: "Test 2",
                    type: ConfigItemType.Text
                }, {
                    name: "test3",
                    label: "Test 3",
                    type: ConfigItemType.Options,
                    options: [ {
                        name: "dayMode",
                        label: "Day Mode",
                    }, {
                        name: "nightMode",
                        label: "Night Mode",
                    }]
                }]
            }
        ]
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
        let content = fs.readFileSync(_path, "utf8");
        let obj = JSON.parse(content);

        config.tabs.forEach((tab: ConfigTab, tabIndex: number) => {
            if (tab.name in obj) {
                let tabObj = obj[tab.name];

                tab.items.forEach((item: ConfigItem, itemIndex: number) => {

                    if (item.name in tabObj) {
                        let itemObj = obj[item.name];

                        item.value = itemObj;
                    } else {
                        console.log("Can not find item \"", item.name, "\" in tab \"", tab.name, "\" in config file.");
                    }

                });

            } else {
                console.log("Can not find tab \"", tab.name, "\" in config file.");
            }
        });

        return false;
    }

    export function saveConfigToDefaultPath(config: Config) : boolean {
        return saveConfigToPath(getDefaultPath(), config);
    }

    export function saveConfigToPath(_path: string, config: Config) : boolean {
        var obj: any;

        config.tabs.forEach((tab: ConfigTab, tabIndex: number) => {
            let tabName = tab.name;
            let subObj = {};

            tab.items.forEach((item: ConfigItem, itemIndex: number) => {
                let itemName = item.name;

                subObj[itemName] = item.value;
            });

            obj[tabName] = subObj;
        });

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
