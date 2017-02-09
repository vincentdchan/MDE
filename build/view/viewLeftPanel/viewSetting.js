"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMZWZ0UGFuZWwvdmlld1NldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFpRDtBQUVqRCxJQUFZLGlCQUVYO0FBRkQsV0FBWSxpQkFBaUI7SUFDekIsNkRBQU0sQ0FBQTtJQUFFLDZEQUFNLENBQUE7SUFBRSxtRUFBUyxDQUFBO0lBQUUsaUVBQVEsQ0FBQTtBQUN2QyxDQUFDLEVBRlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFFNUI7QUFXRCw2QkFBb0MsR0FBUTtJQUN4QyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQ3BHLENBQUM7QUFGRCxrREFFQztBQUVELHFCQUFzQixTQUFRLGdCQUFTLENBQUMsZUFBZTtJQUVuRDtRQUNJLEtBQUssQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztDQUVKO0FBRUQsMkJBQTRCLFNBQVEsZUFBZTtJQUUvQztRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUVKO0FBRUQsMEJBQTJCLFNBQVEsZUFBZTtJQUU5QztRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUVKO0FBSUQsaUJBQXlCLFNBQVEsZ0JBQVMsQ0FBQyxlQUFlO0lBSXRELFlBQVksT0FBZ0M7UUFDeEMsS0FBSyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBNkI7WUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksRUFBRSxHQUFzQixNQUFNLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztDQUVKO0FBdkJELGtDQXVCQyIsImZpbGUiOiJ2aWV3L3ZpZXdMZWZ0UGFuZWwvdmlld1NldHRpbmcuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
