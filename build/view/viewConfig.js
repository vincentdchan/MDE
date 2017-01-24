"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
const configuration_1 = require("../model/configuration");
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
    bind(config) {
        this._model = config;
        this._tabs.bind(config);
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
        for (let itemName in evt.tab.items) {
            let item = evt.tab.items[itemName];
            let elem = this.generateSettingItemElem(item);
            this._items_container.appendChild(elem);
        }
    }
    generateSettingItemElem(item) {
        let elem = util_1.DomHelper.Generic.elem("div", "mde-config-item");
        elem.appendChild(document.createTextNode(item.label));
        switch (item.type) {
            case configuration_1.ConfigItemType.Text:
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
            case configuration_1.ConfigItemType.Checkbox:
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
            case configuration_1.ConfigItemType.Options:
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
    constructor(name, tab) {
        super("tabSelected");
        this._tab = tab;
        this._name = name;
    }
    get tab() { return this._tab; }
    get name() { return this._name; }
}
exports.TabSelectedEvent = TabSelectedEvent;
class ConfigTabsView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-config-tabs");
        this._activeKey = null;
    }
    bind(config) {
        this._model = config;
        this.render();
        let keys = Object.keys(this._model);
        if (keys.length > 0) {
            this.activeItemName = keys[0];
            this.tabsClicked(keys[0], config[keys[0]]);
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
        for (let tabName in this._model) {
            let tab = this._model[tabName];
            let elem = this.generateTabElem(tabName, tab);
            this._container.appendChild(elem);
        }
    }
    generateTabElem(name, tab) {
        let elem = util_1.DomHelper.Generic.elem("div", "mde-config-tab");
        let span = util_1.DomHelper.Generic.elem("span", "mde-config-tab-name");
        span.appendChild(document.createTextNode(tab.label));
        elem.appendChild(span);
        elem.addEventListener("click", (e) => {
            if (name != this._activeKey) {
                this.activeItemName = name;
                this.tabsClicked(name, tab);
            }
        });
        return elem;
    }
    tabsClicked(name, tab) {
        let evt = new TabSelectedEvent(name, tab);
        this._dom.dispatchEvent(evt);
    }
    get activeItemName() {
        return this._activeKey;
    }
    set activeItemName(itemName) {
        let index = 0;
        for (let iName in this._model) {
            let child = this._container.children.item(index);
            if (iName == itemName) {
                if (!child.classList.contains("active"))
                    child.classList.add("active");
            }
            else {
                if (child.classList.contains("active"))
                    child.classList.remove("active");
            }
            index++;
        }
        this._activeKey = itemName;
    }
}
exports.ConfigTabsView = ConfigTabsView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE0RSxTQUM1RSxDQUFDLENBRG9GO0FBRXJGLDZCQUF5QixjQUN6QixDQUFDLENBRHNDO0FBQ3ZDLGdDQUE0RCx3QkFFNUQsQ0FBQyxDQUZtRjtBQUVwRix5QkFBZ0MsZ0JBQVMsQ0FBQyxZQUFZO0lBU2xEO1FBQ0ksTUFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFSdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVU3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksdUJBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtZQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FB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
