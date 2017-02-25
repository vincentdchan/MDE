"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQStCO0FBQy9CLDZCQUE0QjtBQUM1Qix5QkFBd0I7QUFnQnhCLElBQVksY0FHWDtBQUhELFdBQVksY0FBYztJQUV0QixtREFBSSxDQUFBO0lBQUUseURBQU8sQ0FBQTtJQUFFLHFEQUFLLENBQUE7SUFBRSwyREFBUSxDQUFBO0lBQUUscURBQUssQ0FBQTtBQUN6QyxDQUFDLEVBSFcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFHekI7QUFFRCxJQUFZLFlBRVg7QUFGRCxXQUFZLFlBQVk7SUFDcEIsbURBQU0sQ0FBQTtJQUFFLHFEQUFPLENBQUE7SUFBRSxpREFBSyxDQUFBO0FBQzFCLENBQUMsRUFGVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUV2QjtBQU9ELDBCQUFpQyxHQUFRO0lBQ3JDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDO0FBQ2xGLENBQUM7QUFGRCw0Q0FFQztBQTRERCxJQUFpQixpQkFBaUIsQ0E0SGpDO0FBNUhELFdBQWlCLGlCQUFpQjtJQUU5Qix1QkFBOEIsTUFBYztRQUV4QyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUU3QixHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFL0IsSUFBSSxDQUFD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QUFDO0lBQ3RELENBQUM7SUFGZSx5Q0FBdUIsMEJBRXRDLENBQUE7SUFFRCwwQkFBaUMsS0FBYSxFQUFFLE1BQWM7UUFDMUQsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVoQixHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDeEMsQ0FBQztZQUVELEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO1lBQzdCLFFBQVEsRUFBRSxNQUFNO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXRCZSxrQ0FBZ0IsbUJBc0IvQixDQUFBO0lBRUQsNEJBQW9DLFNBQVEsS0FBSztRQUk3QyxZQUFZLE9BQWU7WUFDdkIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXRDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FFMUM7SUFaWSx3Q0FBc0IseUJBWWxDLENBQUE7SUFFRCw2QkFBcUMsU0FBUSxLQUFLO1FBSTlDLFlBQVksUUFBZ0I7WUFDeEIsS0FBSyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FFNUM7SUFaWSx5Q0FBdUIsMEJBWW5DLENBQUE7QUFFTCxDQUFDLEVBNUhnQixpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQTRIakMiLCJmaWxlIjoibW9kZWwvY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
