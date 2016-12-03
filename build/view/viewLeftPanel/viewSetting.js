"use strict";
const util_1 = require("../../util");
(function (SettingOptionType) {
    SettingOptionType[SettingOptionType["Header"] = 0] = "Header";
    SettingOptionType[SettingOptionType["Toggle"] = 1] = "Toggle";
    SettingOptionType[SettingOptionType["TextInput"] = 2] = "TextInput";
    SettingOptionType[SettingOptionType["TextArea"] = 3] = "TextArea";
})(exports.SettingOptionType || (exports.SettingOptionType = {}));
var SettingOptionType = exports.SettingOptionType;
function isSettingItemOption(obj) {
    return (obj.name && obj.type) && (typeof obj.name === "string" && typeof obj.type === "object");
}
exports.isSettingItemOption = isSettingItemOption;
class SettingItemView extends util_1.DomHelper.AbsoluteElement {
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
class SettingView extends util_1.DomHelper.AbsoluteElement {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvdmlld1NldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxZQUVyQyxDQUFDLENBRmdEO0FBRWpELFdBQVksaUJBQWlCO0lBQ3pCLDZEQUFNLENBQUE7SUFBRSw2REFBTSxDQUFBO0lBQUUsbUVBQVMsQ0FBQTtJQUFFLGlFQUFRLENBQUE7QUFDdkMsQ0FBQyxFQUZXLHlCQUFpQixLQUFqQix5QkFBaUIsUUFFNUI7QUFGRCxJQUFZLGlCQUFpQixHQUFqQix5QkFFWCxDQUFBO0FBV0QsNkJBQW9DLEdBQVE7SUFDeEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztBQUNwRyxDQUFDO0FBRmUsMkJBQW1CLHNCQUVsQyxDQUFBO0FBRUQsOEJBQThCLGdCQUFTLENBQUMsZUFBZTtJQUVuRDtRQUNJLE1BQU0sS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBRUQsb0NBQW9DLGVBQWU7SUFFL0M7UUFDSSxPQUFPLENBQUM7SUFDWixDQUFDO0FBRUwsQ0FBQztBQUVELG1DQUFtQyxlQUFlO0lBRTlDO1FBQ0ksT0FBTyxDQUFDO0lBQ1osQ0FBQztBQUVMLENBQUM7QUFJRCwwQkFBaUMsZ0JBQVMsQ0FBQyxlQUFlO0lBSXRELFlBQVksT0FBZ0M7UUFDeEMsTUFBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQTZCO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBRTVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEVBQUUsR0FBc0IsTUFBTSxDQUFDO1lBQ3ZDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBdkJZLG1CQUFXLGNBdUJ2QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld0xlZnRQYW5lbC92aWV3U2V0dGluZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
