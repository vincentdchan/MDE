import {remote} from "electron"
import * as path from "path"
import * as fs from "fs"
import {i18n, StringFormat} from "../util"

export interface Config
{
    [tabName: string]: ConfigTab;
}

export interface ConfigTab
{
    label?: string;
    labelThunk?: () => string;
    items: {
        [itemName: string]: ConfigItem;
    };
}

export enum ConfigItemType
{
    Text, Options, Radio, Checkbox, Slide
}

export enum ValidateType {
    Normal, Warning, Error
}

export interface ValidateResult {
    type: ValidateType;
    message: string
}

export function isValidateResult(obj: any) : obj is ValidateResult {
    return "type" in obj && "message" in obj && typeof obj["message"] == "string";
}

/**
 * When new value is giving to the config item,
 * it will be passed to a validator.
 * 
 * A validator could be a funtion or an object.
 * 
 * A validator will check the value and return the result.
 * 
 * ```
 * if the return value is boolean then
 *     if value is true:
 *         update the value
 *     else
 *         show an red alert
 * ```
 * 
 * if the return value is A `ValidateResult`
 * then show the alert according to the result
 */
export interface Validator {
    (value: any): boolean | ValidateResult; 
}

export namespace ValidatorGenerator {

    /**
     * Generate a `Validator`, to check the value in the range
     * between `start` and `end`, including these.
     */
    export function NumberInRange(start: number, end: number): Validator {
        return function (value: any): boolean | ValidateResult {
            if (typeof value == "number") {

                if (value >= start && value <= end) {
                    return true;
                }

                return {
                    type: ValidateType.Error,
                    message: StringFormat(i18n.getString("value must be between {0} and {1}"), 
                    start.toString(), end.toString()),
                };

            } else {
                return {
                    type: ValidateType.Error,
                    message: i18n.getString("config.alert.valueIsNotNumber")
                };
            }
        }
    }

}

export interface ConfigItem
{

    label?: string;
    labelThunk?: () => string;

    type: ConfigItemType;

    value?: any;

    /**
     * enable for **Options** and **Combobox**
     */
    options?: ConfigItemOption[];

    /**
     * trigger when the value is given to the ConfigItem, 
     * even if load config from the file.
     */
    onChanged?: (newValue, oldValue: any) => void;

    validator? : [Validator];

}

export interface ConfigItemOption {
    name: string;

    label?: string;
    labelThunk?: () => string;
}

/**
 * All the IO handle are sync
 */
export namespace ConfigurationUtil {

    export function completeLabel(config: Config) {

        for (let tabName in config) {
            let tab = config[tabName];
            tab.label = tab.labelThunk();

            for (let itemName in tab.items) {
                let item = tab.items[itemName];

                item.label = item.labelThunk();
                if (item.type === ConfigItemType.Options || item.type === ConfigItemType.Radio) {
                    item.options.forEach((op) => {
                        op.label = op.labelThunk();
                    })
                }
            }
        }

    }

    function getDefaultPath(): string {
        let userDefaultData = remote.app.getPath("userData");
        return path.join(userDefaultData, "config.json");
    }

    export function loadConfigFromDefaultPath(config: Config) : boolean {
        return loadConfigFromPath(getDefaultPath(), config);
    }

    export function loadConfigFromPath(_path: string, config: Config): boolean {
        if (!fs.existsSync(_path)) {
            console.log("file not exisit:", _path);
            return false;
        }

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
