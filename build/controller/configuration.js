"use strict";
const util_1 = require("../util");
const configuration_1 = require("../model/configuration");
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
function configurationThunk(mde) {
    return {
        "general": {
            label: util_1.i18n.getString("config.general"),
            items: {
                "language": {
                    label: util_1.i18n.getString("config.general.language"),
                    type: configuration_1.ConfigItemType.Options,
                    options: [{
                            name: "chs",
                            label: util_1.i18n.getString("config.general.language.chs"),
                        }, {
                            name: "esn",
                            label: util_1.i18n.getString("config.general.language.esn")
                        }],
                    value: "chs"
                },
                "showLineNumber": {
                    label: util_1.i18n.getString("config.general.showLineNumber"),
                    type: configuration_1.ConfigItemType.Checkbox,
                }
            }
        },
        "style": {
            label: util_1.i18n.getString("config.style"),
            items: {
                "fontSize": {
                    label: util_1.i18n.getString("config.style.fontSize"),
                    type: configuration_1.ConfigItemType.Radio,
                    options: [{
                            name: "big",
                            label: util_1.i18n.getString("config.style.fontSize.big"),
                        }, {
                            name: "normal",
                            label: util_1.i18n.getString("config.style.fontSize.normal"),
                        }, {
                            name: "small",
                            label: util_1.i18n.getString("config.style.fontSize.small"),
                        }],
                    value: "normal",
                },
                "lineHeight": {
                    label: util_1.i18n.getString("config.style.lineHeight"),
                    type: configuration_1.ConfigItemType.Text,
                    value: "18",
                }
            }
        }
    };
}
exports.configurationThunk = configurationThunk;
var Configuration;
(function (Configuration) {
    function getDefaultPath() {
        let userDefaultData = electron_1.app.getPath("userData");
        return path.join(userDefaultData, "config.json");
    }
    function loadConfigFromDefaultPath(config) {
        return loadConfigFromPath(getDefaultPath(), config);
    }
    Configuration.loadConfigFromDefaultPath = loadConfigFromDefaultPath;
    function loadConfigFromPath(_path, config) {
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
                    }
                    else {
                        console.log("Can not find item \"", itemName, "\" in tab \"", tabName, "\" in config file.");
                    }
                }
            }
            else {
                console.log("Can not find tab \"", tabName, "\" in config file.");
            }
        }
        return true;
    }
    Configuration.loadConfigFromPath = loadConfigFromPath;
    function saveConfigToDefaultPath(config) {
        return saveConfigToPath(getDefaultPath(), config);
    }
    Configuration.saveConfigToDefaultPath = saveConfigToDefaultPath;
    function saveConfigToPath(_path, config) {
        var obj = {};
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
    Configuration.saveConfigToPath = saveConfigToPath;
    class ConfigTabNotFoundError extends Error {
        constructor(tabName) {
            super("TabNotFoundError: " + tabName);
            this._tabName = tabName;
        }
        get tabName() { return this._tabName; }
    }
    Configuration.ConfigTabNotFoundError = ConfigTabNotFoundError;
    class ConfigItemNotFoundError extends Error {
        constructor(itemName) {
            super("ItemNameNotFound: " + itemName);
            this._itemName = itemName;
        }
        get itemName() { return this._itemName; }
    }
    Configuration.ConfigItemNotFoundError = ConfigItemNotFoundError;
})(Configuration = exports.Configuration || (exports.Configuration = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFpQztBQUNqQywwREFBb0Y7QUFFcEYsdUNBQTRCO0FBQzVCLDZCQUE0QjtBQUM1Qix5QkFBd0I7QUFFeEIsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDcEMsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDN0MsSUFBSSxFQUFFLDhCQUFjLENBQUMsT0FBTztvQkFDNUIsT0FBTyxFQUFFLENBQUM7NEJBQ04sSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELEVBQUU7NEJBQ0MsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELENBQUM7b0JBQ0YsS0FBSyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsK0JBQStCLENBQUM7b0JBQ25ELElBQUksRUFBRSw4QkFBYyxDQUFDLFFBQVE7aUJBQ2hDO2FBQ0o7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUNsQyxLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFO29CQUNSLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO29CQUMzQyxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxLQUFLO29CQUMxQixPQUFPLEVBQUUsQ0FBRTs0QkFDUCxJQUFJLEVBQUUsS0FB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QkFBaUMsS0FBYSxFQUFFLE1BQWM7UUFDMUQsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVoQixHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDeEMsQ0FBQztZQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQzdCLFFBQVEsRUFBRSxNQUFNO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXRCZSw4QkFBZ0IsbUJBc0IvQixDQUFBO0lBRUQsNEJBQW9DLFNBQVEsS0FBSztRQUk3QyxZQUFZLE9BQWU7WUFDdkIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FFMUM7SUFaWSxvQ0FBc0IseUJBWWxDLENBQUE7SUFFRCw2QkFBcUMsU0FBUSxLQUFLO1FBSTlDLFlBQVksUUFBZ0I7WUFDeEIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FFNUM7SUFaWSxxQ0FBdUIsMEJBWW5DLENBQUE7QUFFTCxDQUFDLEVBbkdnQixhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQW1HN0IiLCJmaWxlIjoiY29udHJvbGxlci9jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
