"use strict";
(function (ConfigItemType) {
    ConfigItemType[ConfigItemType["Text"] = 0] = "Text";
    ConfigItemType[ConfigItemType["Options"] = 1] = "Options";
    ConfigItemType[ConfigItemType["Radio"] = 2] = "Radio";
    ConfigItemType[ConfigItemType["Checkbox"] = 3] = "Checkbox";
    ConfigItemType[ConfigItemType["Slide"] = 4] = "Slide";
})(exports.ConfigItemType || (exports.ConfigItemType = {}));
var ConfigItemType = exports.ConfigItemType;
(function (ValidateType) {
    ValidateType[ValidateType["Normal"] = 0] = "Normal";
    ValidateType[ValidateType["Warning"] = 1] = "Warning";
    ValidateType[ValidateType["Error"] = 2] = "Error";
})(exports.ValidateType || (exports.ValidateType = {}));
var ValidateType = exports.ValidateType;
function isValidateResult(obj) {
    return "type" in obj && "message" in obj && typeof obj["message"] == "string";
}
exports.isValidateResult = isValidateResult;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFjQSxXQUFZLGNBQWM7SUFFdEIsbURBQUksQ0FBQTtJQUFFLHlEQUFPLENBQUE7SUFBRSxxREFBSyxDQUFBO0lBQUUsMkRBQVEsQ0FBQTtJQUFFLHFEQUFLLENBQUE7QUFDekMsQ0FBQyxFQUhXLHNCQUFjLEtBQWQsc0JBQWMsUUFHekI7QUFIRCxJQUFZLGNBQWMsR0FBZCxzQkFHWCxDQUFBO0FBRUQsV0FBWSxZQUFZO0lBQ3BCLG1EQUFNLENBQUE7SUFBRSxxREFBTyxDQUFBO0lBQUUsaURBQUssQ0FBQTtBQUMxQixDQUFDLEVBRlcsb0JBQVksS0FBWixvQkFBWSxRQUV2QjtBQUZELElBQVksWUFBWSxHQUFaLG9CQUVYLENBQUE7QUFPRCwwQkFBaUMsR0FBUTtJQUNyQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztBQUNsRixDQUFDO0FBRmUsd0JBQWdCLG1CQUUvQixDQUFBIiwiZmlsZSI6Im1vZGVsL2NvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
