"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
class SettingView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-setting");
        this._showed = false;
        this._closeButton = new viewButton_1.ButtonView(36, 36);
        this._closeButton.element().classList.add("mde-setting-close");
        this._closeButton.setIcon("fa fa-close");
        this._closeButton.setTooltip(util_1.i18n.getString("setting.close"));
        this._closeButton.addEventListener("click", (e) => {
            this.toggle();
        });
        this._titleBar = util_1.DomHelper.elem("div", "mde-setting-titlebar");
        this._dom.appendChild(this._titleBar);
        this._closeButton.appendTo(this._titleBar);
        this._tabs = new SettingTabsView();
        this._tabs.appendTo(this._dom);
        this._dom.style.zIndex = "100";
        this.render();
    }
    bind(setting) {
    }
    unbind() {
    }
    show() {
        this._showed = true;
        this.render();
    }
    hide() {
        this._showed = false;
        this.render();
    }
    toggle() {
        this._showed = !this._showed;
        this.render();
    }
    render() {
        if (this._showed) {
            this._dom.style.display = "block";
        }
        else {
            this._dom.style.display = "none";
        }
    }
    dispose() {
    }
}
exports.SettingView = SettingView;
class SettingTabsView extends util_1.DomHelper.AppendableDomWrapper {
    constructor() {
        super("div", "setting-tabs");
    }
}
exports.SettingTabsView = SettingTabsView;
(function (SettingItemType) {
    SettingItemType[SettingItemType["Text"] = 0] = "Text";
    SettingItemType[SettingItemType["Options"] = 1] = "Options";
    SettingItemType[SettingItemType["Combobox"] = 2] = "Combobox";
    SettingItemType[SettingItemType["Checkbox"] = 3] = "Checkbox";
    SettingItemType[SettingItemType["Slide"] = 4] = "Slide";
})(exports.SettingItemType || (exports.SettingItemType = {}));
var SettingItemType = exports.SettingItemType;
let items = [{
        name: "test1",
        label: "Test 1",
        type: SettingItemType.Checkbox,
        default: true
    }, {
        name: "test2",
        label: "Test 2",
        type: SettingItemType.Text,
    }, {
        name: "test3",
        label: "Test 3",
        type: SettingItemType.Slide,
    }
];

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBNEUsU0FDNUUsQ0FBQyxDQURvRjtBQUVyRiw2QkFBeUIsY0FFekIsQ0FBQyxDQUZzQztBQUV2QywwQkFBaUMsZ0JBQVMsQ0FBQyxZQUFZO0lBUW5EO1FBQ0ksTUFBTSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFQeEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksdUJBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtZQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWdCO0lBRXJCLENBQUM7SUFFRCxNQUFNO0lBRU4sQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLE1BQU07UUFDVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNyQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFFUCxDQUFDO0FBRUwsQ0FBQztBQWpFWSxtQkFBVyxjQWlFdkIsQ0FBQTtBQUVELDhCQUFxQyxnQkFBUyxDQUFDLG9CQUFvQjtJQUUvRDtRQUNJLE1BQU0sS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7QUFFTCxDQUFDO0FBTlksdUJBQWUsa0JBTTNCLENBQUE7QUFhRCxXQUFZLGVBQWU7SUFFdkIscURBQUksQ0FBQTtJQUFFLDJEQUFPLENBQUE7SUFBRSw2REFBUSxDQUFBO0lBQUUsNkRBQVEsQ0FBQTtJQUFFLHVEQUFLLENBQUE7QUFDNUMsQ0FBQyxFQUhXLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUFIRCxJQUFZLGVBQWUsR0FBZix1QkFHWCxDQUFBO0FBV0QsSUFBSSxLQUFLLEdBQWtCLENBQUU7UUFDckIsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxlQUFlLENBQUMsUUFBUTtRQUM5QixPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSTtLQUM3QixFQUFFO1FBQ0MsSUFBSSxFQUFFLE9BQU87UUFDYixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSxlQUFlLENBQUMsS0FBSztLQUM5QjtDQUNKLENBQUEiLCJmaWxlIjoidmlldy92aWV3U2V0dGluZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
