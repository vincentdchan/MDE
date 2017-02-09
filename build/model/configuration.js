"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFjQSxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFFdEIsbURBQUksQ0FBQTtJQUFFLHlEQUFPLENBQUE7SUFBRSxxREFBSyxDQUFBO0lBQUUsMkRBQVEsQ0FBQTtJQUFFLHFEQUFLLENBQUE7QUFDekMsQ0FBQyxFQUhXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBRUQsSUFBWSxZQUVYO0FBRkQsV0FBWSxZQUFZO0lBQ3BCLG1EQUFNLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUsaURBQUssQ0FBQTtBQUMxQixDQUFDLEVBRlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFFdkI7QUFPRCwwQkFBaUMsR0FBUTtJQUNyQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztBQUNsRixDQUFDO0FBRkQsNENBRUMiLCJmaWxlIjoibW9kZWwvY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
