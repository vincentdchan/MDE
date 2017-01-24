"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
class ConfigView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-config");
        this._showed = false;
        this._closeButton = new viewButton_1.ButtonView(36, 36);
        this._closeButton.element().classList.add("mde-config-close");
        this._closeButton.setIcon("fa fa-close");
        this._closeButton.setTooltip(util_1.i18n.getString("config.close"));
        this._closeButton.addEventListener("click", (e) => {
            this.toggle();
        });
        this._titleBar = util_1.DomHelper.elem("div", "mde-config-titlebar");
        this._dom.appendChild(this._titleBar);
        this._closeButton.appendTo(this._titleBar);
        this._tabs = new ConfigTabsView();
        this._tabs.appendTo(this._dom);
        this._tabs.addEventListener("tabSelected", (e) => {
            this.handleTabSelected(e);
        });
        this._items_container = util_1.DomHelper.Generic.elem("div", "mde-config-items-container");
        this._dom.appendChild(this._items_container);
        this._dom.style.zIndex = "100";
        this.showOrHide();
    }
    bind(setting) {
        this._model = setting;
        this._tabs.bind(setting.tabs);
    }
    unbind() {
        this._model = null;
        this.render();
    }
    show() {
        this._showed = true;
        this.showOrHide();
    }
    hide() {
        this._showed = false;
        this.showOrHide();
    }
    toggle() {
        this._showed = !this._showed;
        this.showOrHide();
    }
    showOrHide() {
        if (this._showed) {
            this._dom.style.display = "block";
        }
        else {
            this._dom.style.display = "none";
        }
    }
    clearContainer() {
        while (this._items_container.lastChild) {
            this._items_container.removeChild(this._items_container.lastChild);
        }
    }
    render() {
    }
    handleTabSelected(evt) {
        this.clearContainer();
        evt.tab.items.forEach((item, index) => {
            let elem = this.generateSettingItemElem(item);
            this._items_container.appendChild(elem);
        });
    }
    generateSettingItemElem(item) {
        let elem = util_1.DomHelper.Generic.elem("div", "mde-config-item");
        elem.appendChild(document.createTextNode(item.label));
        switch (item.type) {
            case ConfigItemType.Text:
                {
                    let textInput = util_1.DomHelper.Generic.elem("input");
                    textInput.addEventListener("input", (e) => {
                        let old = item.value;
                        item.value = textInput.value;
                        if (item.onChanged)
                            item.onChanged(item.value, old);
                    });
                    if (item.value) {
                        textInput.value = item.value;
                    }
                    else {
                        item.value = "";
                    }
                    elem.appendChild(textInput);
                    break;
                }
            case ConfigItemType.Checkbox:
                {
                    let textInput = util_1.DomHelper.Generic.elem("input");
                    textInput.type = "checkbox";
                    textInput.addEventListener("change", (e) => {
                        let old = item.value;
                        item.value = textInput.checked;
                        if (item.onChanged)
                            item.onChanged(item.value, old);
                    });
                    if (item.value)
                        textInput.checked = item.value;
                    else
                        textInput.checked = false;
                    elem.appendChild(textInput);
                    break;
                }
            case ConfigItemType.Options:
                {
                    let selectElem = util_1.DomHelper.Generic.elem("select");
                    selectElem.addEventListener("change", (e) => {
                        let old = item.value;
                        item.value = selectElem.value;
                        if (item.onChanged)
                            item.onChanged(item.value, old);
                    });
                    item.options.forEach((s) => {
                        let optionElem = util_1.DomHelper.Generic.elem("option");
                        optionElem.appendChild(document.createTextNode(s.label));
                        optionElem.setAttribute("value", s.name);
                        selectElem.appendChild(optionElem);
                    });
                    if (item.value)
                        selectElem.value = item.value;
                    elem.appendChild(selectElem);
                    break;
                }
        }
        return elem;
    }
    dispose() {
    }
}
exports.ConfigView = ConfigView;
class TabSelectedEvent extends Event {
    constructor(tab, index) {
        super("tabSelected");
        this._tab = tab;
        this._index = index;
    }
    get tab() { return this._tab; }
    get index() { return this._index; }
}
exports.TabSelectedEvent = TabSelectedEvent;
class ConfigTabsView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-config-tabs");
        this._activeIndex = -1;
    }
    bind(tabs) {
        this._model = tabs;
        this.render();
        if (this._model.length > 0) {
            this.activeIndex = 0;
            this.tabsClicked(tabs[0], 0);
        }
    }
    unbind() {
        this._model = null;
        this.clearAll();
    }
    clearAll() {
        while (this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }
    render() {
        this.clearAll();
        this._container = util_1.DomHelper.Generic.elem("div", "mde-config-tabs-container");
        this._dom.appendChild(this._container);
        this._model.forEach((tab, index) => {
            let elem = this.generateTabElem(tab, index);
            this._container.appendChild(elem);
        });
    }
    generateTabElem(tab, index) {
        let elem = util_1.DomHelper.Generic.elem("div", "mde-config-tab");
        let span = util_1.DomHelper.Generic.elem("span", "mde-config-tab-name");
        span.appendChild(document.createTextNode(tab.label));
        elem.appendChild(span);
        elem.addEventListener("click", (e) => {
            if (index !== this._activeIndex) {
                this.activeIndex = index;
                this.tabsClicked(tab, index);
            }
        });
        return elem;
    }
    tabsClicked(tab, index) {
        let evt = new TabSelectedEvent(tab, index);
        this._dom.dispatchEvent(evt);
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(index) {
        for (let i = 0; i < this._container.children.length; i++) {
            let child = this._container.children.item(i);
            if (i === index) {
                if (!child.classList.contains("active"))
                    child.classList.add("active");
            }
            else {
                if (child.classList.contains("active"))
                    child.classList.remove("active");
            }
        }
        this._activeIndex = index;
    }
}
exports.ConfigTabsView = ConfigTabsView;
(function (ConfigItemType) {
    ConfigItemType[ConfigItemType["Text"] = 0] = "Text";
    ConfigItemType[ConfigItemType["Options"] = 1] = "Options";
    ConfigItemType[ConfigItemType["Combobox"] = 2] = "Combobox";
    ConfigItemType[ConfigItemType["Checkbox"] = 3] = "Checkbox";
    ConfigItemType[ConfigItemType["Slide"] = 4] = "Slide";
})(exports.ConfigItemType || (exports.ConfigItemType = {}));
var ConfigItemType = exports.ConfigItemType;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE0RSxTQUM1RSxDQUFDLENBRG9GO0FBRXJGLDZCQUF5QixjQUV6QixDQUFDLENBRnNDO0FBRXZDLHlCQUFnQyxnQkFBUyxDQUFDLFlBQVk7SUFTbEQ7UUFDSSxNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQVJ2QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBVTdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSx1QkFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFhO1lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBbUI7WUFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBaUIsS0FBSyxFQUFFLDRCQUE0QixDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDO0lBRU8sY0FBYztRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RSxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU07SUFFZCxDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBcUI7UUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQWdCLEVBQUUsS0FBYTtZQUNsRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxJQUFnQjtRQUM1QyxJQUFJLElBQUksR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQWlCLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssY0FBYyxDQUFDLElBQUk7Z0JBQ3hCLENBQUM7b0JBQ0csSUFBSSxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFtQixPQUFPLENBQUMsQ0FBQztvQkFFbEUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNiLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDakMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQztvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QixLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNELEtBQUssY0FBYyxDQUFDLFFBQVE7Z0JBQzVCLENBQUM7b0JBQ0csSUFBSSxTQUFTLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFtQixPQUFPLENBQUMsQ0FBQztvQkFFbEUsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7b0JBRTVCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7d0JBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDL0MsSUFBSTt3QkFBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFFL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFNUIsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDRCxLQUFLLGNBQWMsQ0FBQyxPQUFPO2dCQUMzQixDQUFDO29CQUNHLElBQUksVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBb0IsUUFBUSxDQUFDLENBQUM7b0JBRXJFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFRO3dCQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4RCxDQUFDLENBQUMsQ0FBQTtvQkFFRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBb0IsUUFBUSxDQUFDLENBQUM7d0JBQ3JFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDekQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUV6QyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFFOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFN0IsS0FBSyxDQUFDO2dCQUNWLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTztJQUVQLENBQUM7QUFFTCxDQUFDO0FBcktZLGtCQUFVLGFBcUt0QixDQUFBO0FBRUQsK0JBQXNDLEtBQUs7SUFLdkMsWUFBWSxHQUFjLEVBQUUsS0FBWTtRQUNwQyxNQUFNLGFBQWEsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLEdBQUcsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0IsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBRXZDLENBQUM7QUFmWSx3QkFBZ0IsbUJBZTVCLENBQUE7QUFFRCw2QkFBb0MsZ0JBQVMsQ0FBQyxlQUFlO0lBTXpEO1FBQ0ksTUFBTSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUg1QixpQkFBWSxHQUFXLENBQUMsQ0FBQyxDQUFDO0lBSWxDLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBaUI7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFFBQVE7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQWlCLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWMsRUFBRSxLQUFhO1lBQzlDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUFjLEVBQUUsS0FBYTtRQUNqRCxJQUFJLElBQUksR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQWlCLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksSUFBSSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBa0IsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7WUFDekMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sV0FBVyxDQUFDLEdBQWMsRUFBRSxLQUFhO1FBQzdDLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBYTtRQUN6QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztBQUVMLENBQUM7QUFsRlksc0JBQWMsaUJBa0YxQixDQUFBO0FBY0QsV0FBWSxjQUFjO0lBRXRCLG1EQUFJLENBQUE7SUFBRSx5REFBTyxDQUFBO0lBQUUsMkRBQVEsQ0FBQTtJQUFFLDJEQUFRLENBQUE7SUFBRSxxREFBSyxDQUFBO0FBQzVDLENBQUMsRUFIVyxzQkFBYyxLQUFkLHNCQUFjLFFBR3pCO0FBSEQsSUFBWSxjQUFjLEdBQWQsc0JBR1gsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdDb25maWcuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
