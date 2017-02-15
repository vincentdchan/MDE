"use strict";
const util_1 = require("../util");
const viewButton_1 = require("./viewButton");
const configuration_1 = require("../model/configuration");
const typescript_domhelper_1 = require("typescript-domhelper");
class ConfigView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-config");
        this._showed = false;
        this._closeButton = new viewButton_1.ButtonView(24, 24);
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
        let itemLabelElem;
        let itemContentElem;
        let itemContainerElem = typescript_domhelper_1.Dom.Div("mde-config-item", null, [
            itemLabelElem = typescript_domhelper_1.Dom.Div("mde-config-item-label", null, [
                typescript_domhelper_1.text(item.label)
            ]),
            itemContentElem = typescript_domhelper_1.Dom.Div("mde-config-item-content"),
        ]);
        switch (item.type) {
            case configuration_1.ConfigItemType.Text:
                {
                    let textInput = typescript_domhelper_1.Dom.Input("mde-config-item-control");
                    textInput.addEventListener("input", (e) => {
                        this.validateAndApplyNewValue(itemName, item, textInput.value);
                    });
                    if (item.value) {
                        textInput.value = item.value;
                    }
                    else {
                        item.value = "";
                    }
                    itemContentElem.appendChild(textInput);
                    break;
                }
            case configuration_1.ConfigItemType.Checkbox:
                {
                    let textInput = typescript_domhelper_1.Dom.Input("mde-config-item-control");
                    textInput.type = "checkbox";
                    textInput.addEventListener("change", (e) => {
                        this.validateAndApplyNewValue(itemName, item, textInput.value);
                    });
                    if (item.value)
                        textInput.checked = item.value;
                    else
                        textInput.checked = false;
                    itemContentElem.appendChild(textInput);
                    break;
                }
            case configuration_1.ConfigItemType.Radio:
                {
                    let radioContainer = typescript_domhelper_1.Dom.Div("mde-config-item-control");
                    item.options.forEach((v) => {
                        let textInput = util_1.DomHelper.Generic.elem("input", "mde-config-item-control");
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
                        radioContainer.appendChild(textInput);
                        radioContainer.appendChild(typescript_domhelper_1.Dom.Label(null, null, [
                            typescript_domhelper_1.text(v.label)
                        ]));
                    });
                    itemContentElem.appendChild(radioContainer);
                    break;
                }
            case configuration_1.ConfigItemType.Options:
                {
                    let selectElem = typescript_domhelper_1.Dom.Select("mde-config-item-control", null, item.options.map((s) => {
                        let optionElem = util_1.DomHelper.Generic.elem("option");
                        optionElem.appendChild(document.createTextNode(s.label));
                        optionElem.setAttribute("value", s.name);
                        return optionElem;
                    }));
                    selectElem.addEventListener("change", (e) => {
                        this.validateAndApplyNewValue(itemName, item, selectElem.value);
                    });
                    if (item.value)
                        selectElem.value = item.value;
                    itemContentElem.appendChild(selectElem);
                    break;
                }
        }
        let alertContainer = typescript_domhelper_1.Dom.Div("mde-config-alert");
        itemContainerElem.appendChild(alertContainer);
        return itemContainerElem;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFxRjtBQUVyRiw2Q0FBdUM7QUFDdkMsMERBQzRGO0FBQzVGLCtEQUFvRDtBQVNwRCxnQkFBd0IsU0FBUSxnQkFBUyxDQUFDLFlBQVk7SUFTbEQ7UUFDSSxLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBUnZCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFVN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHVCQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFdBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWE7WUFDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFtQjtZQUMzRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFpQixLQUFLLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sVUFBVTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDO0lBRU8sY0FBYztRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RSxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU07SUFFZCxDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBcUI7UUFDM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxRQUFnQixFQUFFLElBQWdCO1FBRTlELElBQUksYUFBNkIsQ0FBQztRQUNsQyxJQUFJLGVBQStCLENBQUM7UUFFcEMsSUFBSSxpQkFBaUIsR0FBRywwQkFBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUU7WUFDckQsYUFBYSxHQUFHLDBCQUFHLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRTtnQkFDbkQsMkJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ25CLENBQUM7WUFDRixlQUFlLEdBQUcsMEJBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7U0FDdkQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLDhCQUFjLENBQUMsSUFBSTtnQkFDeEIsQ0FBQztvQkFDRyxJQUFJLFNBQVMsR0FBRywwQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUVyRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRSxDQUFDLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDYixTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ3BCLENBQUM7b0JBQ0QsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdkMsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDRCxLQUFLLDhCQUFjLENBQUMsUUFBUTtnQkFDNUIsQ0FBQztvQkFDRyxJQUFJLFNBQVMsR0FBRywwQkFBRyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO29CQUVyRCxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztvQkFFNUIsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkUsQ0FBQyxDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQy9DLElBQUk7d0JBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRS9CLGVBQWUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0QsS0FBSyw4QkFBYyxDQUFDLEtBQUs7Z0JBQ3pCLENBQUM7b0JBQ0csSUFBSSxjQUFjLEdBQUcsMEJBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFFeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLFNBQVMsR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQW1CLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO3dCQUU3RixTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBUTs0QkFDMUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0NBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTs0QkFDbEUsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFFSCxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDO3dCQUN6QyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBRXpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUM3QixDQUFDO3dCQUVELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMEJBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTs0QkFDN0MsMkJBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3lCQUNoQixDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQTtvQkFFRixlQUFlLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM1QyxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNELEtBQUssOEJBQWMsQ0FBQyxPQUFPO2dCQUMzQixDQUFDO29CQUNHLElBQUksVUFBVSxHQUFHLDBCQUFHLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzVFLElBQUksVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBb0IsUUFBUSxDQUFDLENBQUM7d0JBQ3JFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDekQsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUV6QyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUN0QixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVKLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFRO3dCQUMzQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ25FLENBQUMsQ0FBQyxDQUFBO29CQUVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUU5QyxlQUFlLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN4QyxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLGNBQWMsR0FBRywwQkFBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pELGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU5QyxNQUFNLENBQUMsaUJBQWlCLENBQUM7SUFDN0IsQ0FBQztJQUVPLHdCQUF3QixDQUFDLFFBQWdCLEVBQUUsSUFBZ0IsRUFBRSxRQUFhO1FBQzlFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBWSxFQUFFLEtBQWE7Z0JBQy9DLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekIsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxHQUFHLE1BQU0sQ0FBQztvQkFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBRVosQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssNEJBQVksQ0FBQyxNQUFNLENBQUM7d0JBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFHMUQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU87SUFFUCxDQUFDO0NBRUo7QUFwT0QsZ0NBb09DO0FBRUQsc0JBQThCLFNBQVEsS0FBSztJQUt2QyxZQUFZLElBQVksRUFBRSxHQUFjO1FBQ3BDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUVwQztBQWZELDRDQWVDO0FBRUQsb0JBQTRCLFNBQVEsZ0JBQVMsQ0FBQyxlQUFlO0lBTXpEO1FBQ0ksS0FBSyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBSDVCLGVBQVUsR0FBVyxJQUFJLENBQUM7SUFJbEMsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFjO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU8sUUFBUTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTTtRQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBaUIsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBVyxFQUFFLEdBQWM7UUFDL0MsSUFBSSxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFpQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRSxJQUFJLElBQUksR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQWtCLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRWxGLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFhO1lBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLFdBQVcsQ0FBQyxJQUFZLEVBQUUsR0FBYztRQUM1QyxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksY0FBYyxDQUFDLFFBQWdCO1FBQy9CLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVkLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDcEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUM7UUFDWixDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDL0IsQ0FBQztDQUVKO0FBeEZELHdDQXdGQyIsImZpbGUiOiJ2aWV3L3ZpZXdDb25maWcuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
