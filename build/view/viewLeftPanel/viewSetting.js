"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
var SettingOptionType;
(function (SettingOptionType) {
    SettingOptionType[SettingOptionType["Header"] = 0] = "Header";
    SettingOptionType[SettingOptionType["Toggle"] = 1] = "Toggle";
    SettingOptionType[SettingOptionType["TextInput"] = 2] = "TextInput";
    SettingOptionType[SettingOptionType["TextArea"] = 3] = "TextArea";
})(SettingOptionType = exports.SettingOptionType || (exports.SettingOptionType = {}));
function isSettingItemOption(obj) {
    return (obj.name && obj.type) && (typeof obj.name === "string" && typeof obj.type === "object");
}
exports.isSettingItemOption = isSettingItemOption;
class SettingItemView extends util_1.DomWrapper.AbsoluteElement {
    constructor() {
        super("div", "mde-setting-item");
    }
    dispose() {
        if (this._dom) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
class ToggleSettingItemView extends SettingItemView {
    constructor() {
        super();
    }
}
class InputSettingItemView extends SettingItemView {
    constructor() {
        super();
    }
}
class SettingView extends util_1.DomWrapper.AbsoluteElement {
    constructor(options) {
        super("div", "mde-setting");
        options.forEach((option) => {
            if (option === "splitter") {
            }
            else {
                let op = option;
            }
        });
    }
    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
exports.SettingView = SettingView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvdmlld1NldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBa0Q7QUFFbEQsSUFBWSxpQkFFWDtBQUZELFdBQVksaUJBQWlCO0lBQ3pCLDZEQUFNLENBQUE7SUFBRSw2REFBTSxDQUFBO0lBQUUsbUVBQVMsQ0FBQTtJQUFFLGlFQUFRLENBQUE7QUFDdkMsQ0FBQyxFQUZXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBRTVCO0FBV0QsNkJBQW9DLEdBQVE7SUFDeEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztBQUNwRyxDQUFDO0FBRkQsa0RBRUM7QUFFRCxxQkFBc0IsU0FBUSxpQkFBVSxDQUFDLGVBQWU7SUFFcEQ7UUFDSSxLQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7Q0FFSjtBQUVELDJCQUE0QixTQUFRLGVBQWU7SUFFL0M7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FFSjtBQUVELDBCQUEyQixTQUFRLGVBQWU7SUFFOUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FFSjtBQUlELGlCQUF5QixTQUFRLGlCQUFVLENBQUMsZUFBZTtJQUl2RCxZQUFZLE9BQWdDO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQTZCO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRTVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUUsR0FBc0IsTUFBTSxDQUFDO1lBQ3ZDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7Q0FFSjtBQXZCRCxrQ0F1QkMiLCJmaWxlIjoidmlldy92aWV3TGVmdFBhbmVsL3ZpZXdTZXR0aW5nLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
