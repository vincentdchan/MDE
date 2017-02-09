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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFpQztBQUNqQywwREFBb0Y7QUFFcEYsdUNBQTRCO0FBQzVCLDZCQUE0QjtBQUM1Qix5QkFBd0I7QUFFeEIsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDcEMsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDN0MsSUFBSSxFQUFFLDhCQUFjLENBQUMsT0FBTztvQkFDNUIsT0FBTyxFQUFFLENBQUM7NEJBQ04sSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELEVBQUU7NEJBQ0MsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELENBQUM7b0JBQ0YsS0FBSyxFQUFFLEtBQUs7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsK0JBQStCLENBQUM7b0JBQ25ELElBQUksRUFBRSw4QkFBYyxDQUFDLFFBQVE7aUJBQ2hDO2FBQ0o7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUNsQyxLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFO29CQUNSLEtBQUssRUFBRSxXQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO29CQUMzQyxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxLQUFLO29CQUMxQixPQUFPLEVBQUUsQ0FBRTs0QkFDUCxJQUFJLEVBQUUsS0FB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QUVsQixHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ3hDLENBQUM7WUFFRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzFCLENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUM3QixRQUFRLEVBQUUsTUFBTTtTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF0QmUsOEJBQWdCLG1CQXNCL0IsQ0FBQTtJQUVELDRCQUFvQyxTQUFRLEtBQUs7UUFJN0MsWUFBWSxPQUFlO1lBQ3ZCLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUV0QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBRTFDO0lBWlksb0NBQXNCLHlCQVlsQyxDQUFBO0lBRUQsNkJBQXFDLFNBQVEsS0FBSztRQUk5QyxZQUFZLFFBQWdCO1lBQ3hCLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBSSxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBRTVDO0lBWlkscUNBQXVCLDBCQVluQyxDQUFBO0FBRUwsQ0FBQyxFQWxHZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFrRzdCIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
