"use strict";
const util_1 = require("../util");
const configuration_1 = require("../model/configuration");
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
function configurationThunk(mde) {
    return {
        "general": {
            label: util_1.i18n.getString("preference.tab.general"),
            items: {
                "test": {
                    label: "Test 1",
                    type: configuration_1.ConfigItemType.Text,
                },
                "test2": {
                    label: "Test 2",
                    type: configuration_1.ConfigItemType.Checkbox,
                }
            }
        },
        "other": {
            label: "Other",
            items: {
                "test2": {
                    label: "Test 2",
                    type: configuration_1.ConfigItemType.Text
                },
                "test3": {
                    label: "Test 3",
                    type: configuration_1.ConfigItemType.Options,
                    options: [{
                            name: "dayMode",
                            label: "Day Mode",
                        }, {
                            name: "nightMode",
                            label: "Night Mode",
                        }]
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUN4QixDQUFDLENBRGdDO0FBQ2pDLGdDQUE0RCx3QkFDNUQsQ0FBQyxDQURtRjtBQUVwRiwyQkFBa0IsVUFDbEIsQ0FBQyxDQUQyQjtBQUM1QixNQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEIsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7WUFDNUMsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsUUFBUTtvQkFDZixJQUFJLEVBQUUsOEJBQWMsQ0FBQyxJQUFJO2lCQUM1QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLDhCQUFjLENBQUMsUUFBUTtpQkFDaEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxFQUFFO29CQUNMLEtBQUssRUFBRSxRQUFRO29CQUNmLElBQUksRUFBRSw4QkFBYyxDQUFDLElBQUk7aUJBQzVCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsUUFBUTtvQkFDZixJQUFJLEVBQUUsOEJBQWMsQ0FBQyxPQUFPO29CQUM1QixPQUFPLEVBQUUsQ0FBRTs0QkFDUCxJQUFJLEVBQUUsU0FBUzs0QkFDZixLQUFLLEVBQUUsVUFBVTt5QkFDcEIsRUFBRTs0QkFDQyxJQUFJLEVBQUUsV0FBVzs0QkFDakIsS0FBSyxFQUFFLFlBQVk7eUJBQ3RCLENBQUM7aUJBQ0w7YUFDSjtTQUNKO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFwQ2UsMEJBQWtC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QUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUM3QixRQUFRLEVBQUUsTUFBTTtTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF0QmUsOEJBQWdCLG1CQXNCL0IsQ0FBQTtJQUVELHFDQUE0QyxLQUFLO1FBSTdDLFlBQVksT0FBZTtZQUN2QixNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFM0MsQ0FBQztJQVpZLG9DQUFzQix5QkFZbEMsQ0FBQTtJQUVELHNDQUE2QyxLQUFLO1FBSTlDLFlBQVksUUFBZ0I7WUFDeEIsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBSSxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRTdDLENBQUM7SUFaWSxxQ0FBdUIsMEJBWW5DLENBQUE7QUFFTCxDQUFDLEVBbEdnQixhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQWtHN0IiLCJmaWxlIjoiY29udHJvbGxlci9jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
