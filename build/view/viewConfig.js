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
            let elem = this.generateSettingItemElem(itemName, item);
            this._items_container.appendChild(elem);
        }
    }
    generateSettingItemElem(itemName, item) {
        let elem = util_1.DomHelper.Generic.elem("div", "mde-config-item");
        elem.appendChild(document.createTextNode(item.label));
        switch (item.type) {
            case configuration_1.ConfigItemType.Text:
                {
                    let textInput = util_1.DomHelper.Generic.elem("input");
                    textInput.addEventListener("input", (e) => {
                        this.validateAndApplyNewValue(itemName, item, textInput.value);
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
                        this.validateAndApplyNewValue(itemName, item, textInput.value);
                    });
                    if (item.value)
                        textInput.checked = item.value;
                    else
                        textInput.checked = false;
                    elem.appendChild(textInput);
                    break;
                }
            case configuration_1.ConfigItemType.Radio:
                {
                    item.options.forEach((v, index) => {
                        let textInput = util_1.DomHelper.Generic.elem("input");
                        textInput.addEventListener("change", (e) => {
                            if (textInput.checked) {
                                this.validateAndApplyNewValue(itemName, item, textInput.value);
                            }
                        });
                        textInput.type = "radio";
                        textInput.name = "mde_radio_" + itemName;
                        textInput.value = v.name;
                        if (v.name == item.value) {
                            textInput.checked = true;
                        }
                        elem.appendChild(textInput);
                        elem.appendChild(document.createTextNode(v.label));
                    });
                    break;
                }
            case configuration_1.ConfigItemType.Options:
                {
                    let selectElem = util_1.DomHelper.Generic.elem("select");
                    selectElem.addEventListener("change", (e) => {
                        this.validateAndApplyNewValue(itemName, item, selectElem.value);
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
    validateAndApplyNewValue(itemName, item, newValue) {
        let oldValue = item.value;
        let pass = true;
        if (item.validator) {
            item.validator.forEach((v, index) => {
                let result = v(newValue);
                if (typeof result == "boolean") {
                    pass = result;
                    if (!pass) {
                    }
                }
                else if (configuration_1.isValidateResult(result)) {
                    if (result.type !== configuration_1.ValidateType.Normal)
                        pass = false;
                }
                else {
                    throw new Error("Validate result type error, item name:" + item.label);
                }
            });
        }
        if (pass) {
            item.value = newValue;
            if (item.onChanged)
                item.onChanged(item.value, oldValue);
        }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE0RSxTQUM1RSxDQUFDLENBRG9GO0FBRXJGLDZCQUF5QixjQUN6QixDQUFDLENBRHNDO0FBQ3ZDLGdDQUNvRSx3QkFFcEUsQ0FBQyxDQUYyRjtBQUU1Rix5QkFBZ0MsZ0JBQVMsQ0FBQyxZQUFZO0lBU2xEO1FBQ0ksTUFBTSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFSdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQVU3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksdUJBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYTtZQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FB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QUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7WUFDekMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVksRUFBRSxHQUFjO1FBQzVDLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxjQUFjLENBQUMsUUFBZ0I7UUFDL0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUMvQixDQUFDO0FBRUwsQ0FBQztBQXhGWSxzQkFBYyxpQkF3RjFCLENBQUEiLCJmaWxlIjoidmlldy92aWV3Q29uZmlnLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
