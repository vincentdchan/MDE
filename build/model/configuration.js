"use strict";
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
var ConfigItemType;
(function (ConfigItemType) {
    ConfigItemType[ConfigItemType["Text"] = 0] = "Text";
    ConfigItemType[ConfigItemType["Options"] = 1] = "Options";
    ConfigItemType[ConfigItemType["Radio"] = 2] = "Radio";
    ConfigItemType[ConfigItemType["Checkbox"] = 3] = "Checkbox";
    ConfigItemType[ConfigItemType["Slide"] = 4] = "Slide";
})(ConfigItemType = exports.ConfigItemType || (exports.ConfigItemType = {}));
var ValidateType;
(function (ValidateType) {
    ValidateType[ValidateType["Normal"] = 0] = "Normal";
    ValidateType[ValidateType["Warning"] = 1] = "Warning";
    ValidateType[ValidateType["Error"] = 2] = "Error";
})(ValidateType = exports.ValidateType || (exports.ValidateType = {}));
function isValidateResult(obj) {
    return "type" in obj && "message" in obj && typeof obj["message"] == "string";
}
exports.isValidateResult = isValidateResult;
var ConfigurationUtil;
(function (ConfigurationUtil) {
    function completeLabel(config) {
        for (let tabName in config) {
            let tab = config[tabName];
            tab.label = tab.labelThunk();
            for (let itemName in tab.items) {
                let item = tab.items[itemName];
                item.label = item.labelThunk();
                if (item.type === ConfigItemType.Options || item.type === ConfigItemType.Radio) {
                    item.options.forEach((op) => {
                        op.label = op.labelThunk();
                    });
                }
            }
        }
    }
    ConfigurationUtil.completeLabel = completeLabel;
    function getDefaultPath() {
        let userDefaultData = electron_1.remote.app.getPath("userData");
        return path.join(userDefaultData, "config.json");
    }
    function loadConfigFromDefaultPath(config) {
        return loadConfigFromPath(getDefaultPath(), config);
    }
    ConfigurationUtil.loadConfigFromDefaultPath = loadConfigFromDefaultPath;
    function loadConfigFromPath(_path, config) {
        console.log("load user data from:", _path);
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
    ConfigurationUtil.loadConfigFromPath = loadConfigFromPath;
    function saveConfigToDefaultPath(config) {
        return saveConfigToPath(getDefaultPath(), config);
    }
    ConfigurationUtil.saveConfigToDefaultPath = saveConfigToDefaultPath;
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
    ConfigurationUtil.saveConfigToPath = saveConfigToPath;
    class ConfigTabNotFoundError extends Error {
        constructor(tabName) {
            super("TabNotFoundError: " + tabName);
            this._tabName = tabName;
        }
        get tabName() { return this._tabName; }
    }
    ConfigurationUtil.ConfigTabNotFoundError = ConfigTabNotFoundError;
    class ConfigItemNotFoundError extends Error {
        constructor(itemName) {
            super("ItemNameNotFound: " + itemName);
            this._itemName = itemName;
        }
        get itemName() { return this._itemName; }
    }
    ConfigurationUtil.ConfigItemNotFoundError = ConfigItemNotFoundError;
})(ConfigurationUtil = exports.ConfigurationUtil || (exports.ConfigurationUtil = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBK0I7QUFDL0IsNkJBQTRCO0FBQzVCLHlCQUF3QjtBQWdCeEIsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBRXRCLG1EQUFJLENBQUE7SUFBRSx5REFBTyxDQUFBO0lBQUUscURBQUssQ0FBQTtJQUFFLDJEQUFRLENBQUE7SUFBRSxxREFBSyxDQUFBO0FBQ3pDLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6QjtBQUVELElBQVksWUFFWDtBQUZELFdBQVksWUFBWTtJQUNwQixtREFBTSxDQUFBO0lBQUUscURBQU8sQ0FBQTtJQUFFLGlEQUFLLENBQUE7QUFDMUIsQ0FBQyxFQUZXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBRXZCO0FBT0QsMEJBQWlDLEdBQVE7SUFDckMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUM7QUFDbEYsQ0FBQztBQUZELDRDQUVDO0FBNERELElBQWlCLGlCQUFpQixDQTRIakM7QUE1SEQsV0FBaUIsaUJBQWlCO0lBRTlCLHVCQUE4QixNQUFjO1FBRXhDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRTdCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUvQixJQUFJLENBQUMs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QUM7SUFDdEQsQ0FBQztJQUZlLHlDQUF1QiwwQkFFdEMsQ0FBQTtJQUVELDBCQUFpQyxLQUFhLEVBQUUsTUFBYztRQUMxRCxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7UUFFbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWhCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUN4QyxDQUFDO1lBRUQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUMxQixDQUFDO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7WUFDN0IsUUFBUSxFQUFFLE1BQU07U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBdEJlLGtDQUFnQixtQkFzQi9CLENBQUE7SUFFRCw0QkFBb0MsU0FBUSxLQUFLO1FBSTdDLFlBQVksT0FBZTtZQUN2QixLQUFLLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFFdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztLQUUxQztJQVpZLHdDQUFzQix5QkFZbEMsQ0FBQTtJQUVELDZCQUFxQyxTQUFRLEtBQUs7UUFJOUMsWUFBWSxRQUFnQjtZQUN4QixLQUFLLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDOUIsQ0FBQztRQUVELElBQUksUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUU1QztJQVpZLHlDQUF1QiwwQkFZbkMsQ0FBQTtBQUVMLENBQUMsRUE1SGdCLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBNEhqQyIsImZpbGUiOiJtb2RlbC9jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
