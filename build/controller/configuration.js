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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUN4QixDQUFDLENBRGdDO0FBQ2pDLGdDQUE0RCx3QkFDNUQsQ0FBQyxDQURtRjtBQUVwRiwyQkFBa0IsVUFDbEIsQ0FBQyxDQUQyQjtBQUM1QixNQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEIsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDcEMsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDN0MsSUFBSSxFQUFFLDhCQUFjLENBQUMsT0FBTztvQkFDNUIsT0FBTyxFQUFFLENBQUM7NEJBQ04sSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELEVBQUU7NEJBQ0MsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQ3BELENBQUM7b0JBQ0YsS0FBSyxFQUFFLEtBQUs7aUJBQ2Y7YUFDSjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO1lBQ2xDLEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUM7b0JBQzNDLElBQUksRUFBRSw4QkFBYyxDQUFDLEtBQUs7b0JBQzFCLE9BQU8sRUFBRSxDQUFFOzRCQUNQLElBQUksRUFBRSxLQUFLOzRC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QUcsR0FBUSxFQUFFLENBQUM7UUFFbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWhCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUN4QyxDQUFDO1lBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7WUFDN0IsUUFBUSxFQUFFLE1BQU07U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBdEJlLDhCQUFnQixtQkFzQi9CLENBQUE7SUFFRCxxQ0FBNEMsS0FBSztRQUk3QyxZQUFZLE9BQWU7WUFDdkIsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUV0QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTNDLENBQUM7SUFaWSxvQ0FBc0IseUJBWWxDLENBQUE7SUFFRCxzQ0FBNkMsS0FBSztRQUk5QyxZQUFZLFFBQWdCO1lBQ3hCLE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUU3QyxDQUFDO0lBWlkscUNBQXVCLDBCQVluQyxDQUFBO0FBRUwsQ0FBQyxFQWxHZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFrRzdCIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
