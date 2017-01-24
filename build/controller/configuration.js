"use strict";
const util_1 = require("../util");
const viewConfig_1 = require("../view/viewConfig");
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
function configurationThunk(mde) {
    return {
        tabs: [{
                name: "general",
                label: util_1.i18n.getString("preference.tab.general"),
                items: [{
                        name: "test",
                        label: "Test 1",
                        type: viewConfig_1.ConfigItemType.Text,
                    }, {
                        name: "test2",
                        label: "Test 2",
                        type: viewConfig_1.ConfigItemType.Checkbox,
                    }]
            }, {
                name: "other",
                label: "Other",
                items: [{
                        name: "test2",
                        label: "Test 2",
                        type: viewConfig_1.ConfigItemType.Text
                    }, {
                        name: "test3",
                        label: "Test 3",
                        type: viewConfig_1.ConfigItemType.Options,
                        options: [{
                                name: "dayMode",
                                label: "Day Mode",
                            }, {
                                name: "nightMode",
                                label: "Night Mode",
                            }]
                    }]
            }
        ]
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
        config.tabs.forEach((tab, tabIndex) => {
            if (tab.name in obj) {
                let tabObj = obj[tab.name];
                tab.items.forEach((item, itemIndex) => {
                    if (item.name in tabObj) {
                        let itemObj = obj[item.name];
                        item.value = itemObj;
                    }
                    else {
                        console.log("Can not find item \"", item.name, "\" in tab \"", tab.name, "\" in config file.");
                    }
                });
            }
            else {
                console.log("Can not find tab \"", tab.name, "\" in config file.");
            }
        });
        return false;
    }
    Configuration.loadConfigFromPath = loadConfigFromPath;
    function saveConfigToDefaultPath(config) {
        return saveConfigToPath(getDefaultPath(), config);
    }
    Configuration.saveConfigToDefaultPath = saveConfigToDefaultPath;
    function saveConfigToPath(_path, config) {
        var obj;
        config.tabs.forEach((tab, tabIndex) => {
            let tabName = tab.name;
            let subObj = {};
            tab.items.forEach((item, itemIndex) => {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUN4QixDQUFDLENBRGdDO0FBQ2pDLDZCQUE0RCxvQkFDNUQsQ0FBQyxDQUQrRTtBQUVoRiwyQkFBa0IsVUFDbEIsQ0FBQyxDQUQyQjtBQUM1QixNQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEIsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ0MsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLFdBQUMsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7Z0JBQzVDLEtBQUssRUFBRSxDQUFDO3dCQUNKLElBQUksRUFBRSxNQUFNO3dCQUNaLEtBQUssRUFBRSxRQUFRO3dCQUNmLElBQUksRUFBRSwyQkFBYyxDQUFDLElBQUk7cUJBQzVCLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLE9BQU87d0JBQ2IsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLDJCQUFjLENBQUMsUUFBUTtxQkFDaEMsQ0FBQzthQUNMLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLENBQUM7d0JBQ0osSUFBSSxFQUFFLE9BQU87d0JBQ2IsS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLDJCQUFjLENBQUMsSUFBSTtxQkFDNUIsRUFBRTt3QkFDQyxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsMkJBQWMsQ0FBQyxPQUFPO3dCQUM1QixPQUFPLEVBQUUsQ0FBRTtnQ0FDUCxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsVUFBVTs2QkFDcEIsRUFBRTtnQ0FDQyxJQUFJLEVBQUUsV0FBVztn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
