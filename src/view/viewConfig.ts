import {IDisposable, DomHelper, TickTockPair, TickTockUtil, i18n as $} from "../util"
import {Coordinate, IHidable} from "."
import {ButtonView} from "./viewButton"
import {Config, ConfigTab, ConfigItem, ConfigItemType, 
    Validator, ValidateResult, isValidateResult, ValidateType} from "../model/configuration"

export class ConfigView extends DomHelper.FixedElement implements IDisposable {

    private _showed: boolean = false;
    private _model: Config;
    private _tabs: ConfigTabsView;
    private _closeButton: ButtonView;
    private _titleBar: HTMLElement;
    private _items_container: HTMLDivElement;

    constructor() {
        super("div", "mde-config");

        this._closeButton = new ButtonView(36, 36);
        this._closeButton.element().classList.add("mde-config-close");
        this._closeButton.setIcon("fa fa-close");
        this._closeButton.setTooltip($.getString("config.close"));
        this._closeButton.addEventListener("click", (e: MouseEvent) => {
            this.toggle();
        });

        this._titleBar = DomHelper.elem("div", "mde-config-titlebar");
        this._dom.appendChild(this._titleBar);
        this._closeButton.appendTo(this._titleBar);

        this._tabs = new ConfigTabsView();
        this._tabs.appendTo(this._dom);
        this._tabs.addEventListener("tabSelected", (e: TabSelectedEvent) => {
            this.handleTabSelected(e);
        });

        this._items_container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-config-items-container");
        this._dom.appendChild(this._items_container);

        this._dom.style.zIndex = "100";
        this.showOrHide();
    }

    bind(config: Config) {
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

    private showOrHide() {
        if (this._showed) {
            this._dom.style.display = "block";
        } else {
            this._dom.style.display = "none";
        }
    }

    private clearContainer() {
        while (this._items_container.lastChild) {
            this._items_container.removeChild(this._items_container.lastChild);
        }
    }

    private render() {

    }

    private handleTabSelected(evt: TabSelectedEvent) {
        this.clearContainer();

        for (let itemName in evt.tab.items) {
            let item = evt.tab.items[itemName];
            let elem = this.generateSettingItemElem(itemName, item);

            this._items_container.appendChild(elem);
        }
    }

    private generateSettingItemElem(itemName: string, item: ConfigItem) : HTMLDivElement {
        let elem = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-config-item");
        elem.appendChild(document.createTextNode(item.label));

        switch(item.type) {
            case ConfigItemType.Text:
            {
                let textInput = DomHelper.Generic.elem<HTMLInputElement>("input");

                textInput.addEventListener("input", (e) => {
                    this.validateAndApplyNewValue(itemName, item, textInput.value);
                });

                if (item.value) {
                    textInput.value = item.value;
                } else {
                    item.value = "";
                }
                elem.appendChild(textInput);
                break;
            }
            case ConfigItemType.Checkbox:
            {
                let textInput = DomHelper.Generic.elem<HTMLInputElement>("input");

                textInput.type = "checkbox";

                textInput.addEventListener("change", (e) => {
                    this.validateAndApplyNewValue(itemName, item, textInput.value);
                });
                
                if (item.value) textInput.checked = item.value;
                else textInput.checked = false;

                elem.appendChild(textInput);

                break;
            }
            case ConfigItemType.Radio:
            {


                item.options.forEach((v, index) => {
                    let textInput = DomHelper.Generic.elem<HTMLInputElement>("input");

                    textInput.addEventListener("change", (e: Event) => {
                        if (textInput.checked) {
                            this.validateAndApplyNewValue(itemName, item, textInput.value)
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
                })

                break;
            }
            case ConfigItemType.Options:
            {
                let selectElem = DomHelper.Generic.elem<HTMLSelectElement>("select");

                selectElem.addEventListener("change", (e: Event) => {
                    this.validateAndApplyNewValue(itemName, item, selectElem.value)
                })

                item.options.forEach((s) => {
                    let optionElem = DomHelper.Generic.elem<HTMLOptionElement>("option");
                    optionElem.appendChild(document.createTextNode(s.label));
                    optionElem.setAttribute("value", s.name);

                    selectElem.appendChild(optionElem);
                });

                if (item.value) selectElem.value = item.value;

                elem.appendChild(selectElem);

                break;
            }
        }
        return elem;
    }

    private validateAndApplyNewValue(itemName: string, item: ConfigItem, newValue: any) {
        let oldValue = item.value;

        let pass = true;

        if (item.validator) {
            item.validator.forEach((v: Validator, index: number) => {
                let result = v(newValue);

                if (typeof result == "boolean") {
                    pass = result;
                    if (!pass) {
                        // TODO: show red alert
                    }
                } else if (isValidateResult(result)) {
                    if (result.type !== ValidateType.Normal) pass = false;

                    // TODO: show alert
                } else {
                    throw new Error("Validate result type error, item name:" + item.label);
                }
            });
        }

        if (pass) {
            item.value = newValue;
            if (item.onChanged) item.onChanged(item.value, oldValue);
        }
    }

    dispose() {

    }

}

export class TabSelectedEvent extends Event {

    private _tab: ConfigTab;
    private _name: string;

    constructor(name: string, tab: ConfigTab) {
        super("tabSelected");

        this._tab = tab;
        this._name = name;
    }

    get tab() { return this._tab; }
    get name() { return this._name; }

}

export class ConfigTabsView extends DomHelper.AbsoluteElement {

    private _model: Config;
    private _container: HTMLDivElement;
    private _activeKey: string = null;

    constructor () {
        super("div", "mde-config-tabs");
    }

    bind(config: Config) {
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

    private clearAll() {
        while (this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

    private render() {
        this.clearAll();
        this._container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-config-tabs-container");
        this._dom.appendChild(this._container);

        for (let tabName in this._model) {
            let tab = this._model[tabName];
            let elem = this.generateTabElem(tabName, tab);
            this._container.appendChild(elem);
        }
    }

    private generateTabElem(name:string, tab: ConfigTab) : HTMLDivElement {
        let elem = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-config-tab");
        let span = DomHelper.Generic.elem<HTMLSpanElement>("span", "mde-config-tab-name");

        span.appendChild(document.createTextNode(tab.label));
        elem.appendChild(span);

        elem.addEventListener("click", (e: MouseEvent) => {
            if (name != this._activeKey) {
                this.activeItemName = name;
                this.tabsClicked(name, tab);
            }
        });

        return elem;
    }

    private tabsClicked(name: string, tab: ConfigTab) {
        let evt = new TabSelectedEvent(name, tab);
        this._dom.dispatchEvent(evt);
    }

    get activeItemName() {
        return this._activeKey;
    }

    set activeItemName(itemName: string) {
        let index = 0;

        for (let iName in this._model) {
            let child = this._container.children.item(index);
            if (iName == itemName) {
                if (!child.classList.contains("active"))
                    child.classList.add("active");
            } else {
                if (child.classList.contains("active"))
                    child.classList.remove("active");
            }
            index++;
        }

        this._activeKey = itemName;
    }

}
