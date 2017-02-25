import {IDisposable, DomWrapper, TickTockPair, TickTockUtil, i18n as $} from "../util"
import {Coordinate, IHidable} from "."
import {ButtonView} from "./viewButton"
import {Config, ConfigTab, ConfigItem, ConfigItemType, 
    Validator, ValidateResult, isValidateResult, ValidateType} from "../model/configuration"
import {text, elem, Dom} from "typescript-domhelper"

/**
 * ConfigView is a MVVM class, 
 * you can bind `Config` to `ConfigView`,
 * any change in the view will change the value in model.
 * 
 * The size of the class button is fixed.
 */
export class ConfigView extends DomWrapper.FixedElement implements IDisposable {

    private _showed: boolean = false;
    private _model: Config;
    private _tabs: ConfigTabsView;
    private _closeButton: ButtonView;
    private _titleBar: HTMLDivElement;
    private _items_container: HTMLDivElement;
    private _mask: HTMLDivElement;

    constructor() {
        super("div", "mde-config");

        this._closeButton = new ButtonView(24, 24);
        this._closeButton.element().classList.add("mde-config-close");
        this._closeButton.setIcon("fa fa-close");
        this._closeButton.setTooltip($.getString("config.close"));
        this._closeButton.addEventListener("click", (e: MouseEvent) => {
            this.toggle();
        });

        this._titleBar = Dom.Div("mde-config-titlebar");
        this._dom.appendChild(this._titleBar);
        this._closeButton.appendTo(this._titleBar);

        this._tabs = new ConfigTabsView();
        this._tabs.appendTo(this._dom);
        this.onTabSelected((e) => {
            this.handleTabSelected(e);
        })

        this._items_container = Dom.Div("mde-config-items-container");
        this._dom.appendChild(this._items_container);

        this._mask = Dom.Div("mde-config-mask");
        this._mask.style.position = "fixed";
        this._mask.style.zIndex = "99";
        document.body.appendChild(this._mask);
        this._mask.addEventListener("click", (e: MouseEvent) => {
            this.hide();
        })

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
            this._mask.style.display = "block";
            this._dom.focus();
        } else {
            this._dom.style.display = "none";
            this._mask.style.display = "none";
        }
        this._dom.dispatchEvent(new ConfigViewToggleEvent(this._showed));
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

    /**
     * The structure of Item:
     * - container 
     *  - item label
     *  - item content
     *  - item alert
     */
    private generateSettingItemElem(itemName: string, item: ConfigItem) : HTMLDivElement {

        let itemLabelElem: HTMLDivElement;
        let itemContentElem: HTMLDivElement;

        let itemContainerElem = Dom.Div("mde-config-item", null, [
            itemLabelElem = Dom.Div("mde-config-item-label", null, [
                text(item.label)
            ]),
            itemContentElem = Dom.Div("mde-config-item-content"),
        ]);

        switch(item.type) {
            case ConfigItemType.Text:
            {
                let textInput = Dom.Input("mde-config-item-control");

                textInput.addEventListener("input", (e) => {
                    this.validateAndApplyNewValue(itemName, item, 
                    textInput.value, itemContainerElem);
                });

                if (item.value) {
                    textInput.value = item.value;
                } else {
                    item.value = "";
                }
                itemContentElem.appendChild(textInput);
                break;
            }
            case ConfigItemType.Checkbox:
            {
                let textInput = Dom.Input("mde-config-item-control");

                textInput.type = "checkbox";

                textInput.addEventListener("change", (e) => {
                    this.validateAndApplyNewValue(itemName, item, 
                    textInput.value, itemContainerElem);
                });
                
                if (item.value) textInput.checked = item.value;
                else textInput.checked = false;

                itemContentElem.appendChild(textInput);
                break;
            }
            case ConfigItemType.Radio:
            {
                let radioContainer = Dom.Div("mde-config-item-control");

                item.options.forEach((v) => {
                    let textInput = Dom.Input("mde-config-item-control");

                    textInput.addEventListener("change", (e: Event) => {
                        if (textInput.checked) {
                            this.validateAndApplyNewValue(itemName, item, textInput.value, 
                            itemContainerElem)
                        }
                    });

                    textInput.type = "radio";
                    textInput.name = "mde_radio_" + itemName;
                    textInput.value = v.name;

                    if (v.name == item.value) {
                        textInput.checked = true;
                    }

                    radioContainer.appendChild(textInput);
                    radioContainer.appendChild(Dom.Label(null , null, [
                        text(v.label)
                    ]));
                })

                itemContentElem.appendChild(radioContainer);
                break;
            }
            case ConfigItemType.Options:
            {
                let selectElem = Dom.Select("mde-config-item-control", null, item.options.map((s) => {
                    let optionElem = Dom.Option();
                    optionElem.appendChild(document.createTextNode(s.label));
                    optionElem.setAttribute("value", s.name);

                    return optionElem;
                }));

                selectElem.addEventListener("change", (e: Event) => {
                    this.validateAndApplyNewValue(itemName, item, 
                    selectElem.value, itemContainerElem)
                })

                if (item.value) selectElem.value = item.value;

                itemContentElem.appendChild(selectElem);
                break;
            }
        }

        let alertContainer = Dom.Div("mde-config-alert-container");
        itemContainerElem.appendChild(alertContainer);

        return itemContainerElem;
    }

    /**
     * This method check the `newValue` with the validators defined
     * int the config model.
     * 
     * Show alert in the DOM if validator does not return true.
     * 
     * @param elem the container DOM element of the config item.
     * @return `true` if no alerts.
     */
    private validateAndApplyNewValue(itemName: string, item: ConfigItem, 
    newValue: any, elem: HTMLElement) : boolean {
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

            let evt = new TabItemChanged();
            this._dom.dispatchEvent(evt);
            return true;
        }
        return false;
    }

    private appendAlert(elem: HTMLElement, _type: ValidateType, msg: string) {
        let alertContainer = <HTMLElement>elem.getElementsByClassName("mde-config-alert-container")[0];

        let target = Dom.Div("mde-config-alert", null, [
            Dom.Paragraph("", null, [text(msg)])
        ]);
        switch(_type) {
            case ValidateType.Normal:
                alertContainer.classList.add("normal");
                break;
            case ValidateType.Warning:
                alertContainer.classList.add("warning");
                break;
            case ValidateType.Error:
                alertContainer.classList.add("error");
                break;
        }

        alertContainer.appendChild(target);
    }

    private clearAlerts(elem: HTMLElement) {
        let alertContainer = <HTMLElement>elem.getElementsByClassName("mde-config-alert-container")[0];

        while (alertContainer.lastChild) {
            alertContainer.removeChild(alertContainer.lastChild);
        }
    }

    onToggle(callback: (evt: ConfigViewToggleEvent) => void) {
        this._dom.addEventListener("ConfigViewToggleEvent", callback);
    }

    onTabItemChanged(callback: (evt: TabItemChanged) => void) {
        this._dom.addEventListener("TabItemChanged", callback);
    }

    onTabSelected(callback: (evt: TabSelectedEvent) => void) {
        this._tabs.addEventListener("tabSelected", callback);
    }

    dispose() {
        document.body.removeChild(this._mask);
    }

}

/**
 * This event does not contains the information about
 * the item. It just tell the host that some item has changed,
 * and save all the config to the file.
 */
export class TabItemChanged extends Event {

    constructor() {
        super("TabItemChanged");
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

export class ConfigTabsView extends DomWrapper.AbsoluteElement {

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
        this._container = Dom.Div("mde-config-tabs-container");
        this._dom.appendChild(this._container);

        for (let tabName in this._model) {
            let tab = this._model[tabName];
            let elem = this.generateTabElem(tabName, tab);
            this._container.appendChild(elem);
        }
    }

    private generateTabElem(name:string, tab: ConfigTab) : HTMLDivElement {
        let elem = Dom.Div("mde-config-tab");
        let span = Dom.Span("mde-config-tab-name");

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

export class ConfigViewToggleEvent extends Event {

    private _showed: boolean;

    constructor(showed: boolean) {
        super("ConfigViewToggleEvent");
        this._showed = showed;
    }

    get showed() {
        return this._showed;
    }

}
