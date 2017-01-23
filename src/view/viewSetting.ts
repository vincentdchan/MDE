import {IDisposable, DomHelper, TickTockPair, TickTockUtil, i18n as $} from "../util"
import {Coordinate, IHidable} from "."
import {ButtonView} from "./viewButton"

export class SettingView extends DomHelper.FixedElement implements IDisposable {

    private _showed: boolean = false;
    private _model: Setting;
    private _tabs: SettingTabsView;
    private _closeButton: ButtonView;
    private _titleBar: HTMLElement;
    private _items_container: HTMLDivElement;

    constructor() {
        super("div", "mde-setting");

        this._closeButton = new ButtonView(36, 36);
        this._closeButton.element().classList.add("mde-setting-close");
        this._closeButton.setIcon("fa fa-close");
        this._closeButton.setTooltip($.getString("setting.close"));
        this._closeButton.addEventListener("click", (e: MouseEvent) => {
            this.toggle();
        });

        this._titleBar = DomHelper.elem("div", "mde-setting-titlebar");
        this._dom.appendChild(this._titleBar);
        this._closeButton.appendTo(this._titleBar);

        this._tabs = new SettingTabsView();
        this._tabs.appendTo(this._dom);
        this._tabs.addEventListener("tabSelected", (e: TabSelectedEvent) => {
            this.handleTabSelected(e);
        });

        this._items_container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-setting-items-container");
        this._dom.appendChild(this._items_container);

        this._dom.style.zIndex = "100";
        this.showOrHide();
    }

    bind(setting: Setting) {
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

        evt.tab.items.forEach((item: SettingItem, index: number) => {
            let elem = this.generateSettingItemElem(item);

            this._items_container.appendChild(elem);
        });
    }

    private generateSettingItemElem(item: SettingItem) : HTMLDivElement {
        let elem = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-setting-item");
        elem.appendChild(document.createTextNode(item.label));

        switch(item.type) {
            case SettingItemType.Text:
            {
                let textInput = DomHelper.Generic.elem<HTMLInputElement>("input");

                textInput.addEventListener("input", (e) => {
                    let old = item.value;
                    item.value = textInput.value;
                    if (item.onChanged) item.onChanged(item.value, old);
                });

                if (item.value) {
                    textInput.value = item.value;
                } else {
                    item.value = "";
                }
                elem.appendChild(textInput);
                break;
            }
            case SettingItemType.Checkbox:
            {
                let textInput = DomHelper.Generic.elem<HTMLInputElement>("input");

                textInput.type = "checkbox";

                textInput.addEventListener("change", (e) => {
                    let old = item.value;
                    item.value = textInput.checked;
                    if (item.onChanged) item.onChanged(item.value, old);
                });
                
                if (item.value) textInput.checked = item.value;
                else textInput.checked = false;

                elem.appendChild(textInput);

                break;
            }
            case SettingItemType.Options:
            {
                let selectElem = DomHelper.Generic.elem<HTMLSelectElement>("select");

                selectElem.addEventListener("change", (e: Event) => {
                    let old = item.value;
                    item.value = selectElem.value;
                    if (item.onChanged) item.onChanged(item.value, old);
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

    dispose() {

    }

}

export class TabSelectedEvent extends Event {

    private _tab: SettingTab;
    private _index: number;

    constructor(tab: SettingTab, index:number) {
        super("tabSelected");

        this._tab = tab;
        this._index = index;
    }

    get tab() { return this._tab; }
    get index() { return this._index; }

}

export class SettingTabsView extends DomHelper.AbsoluteElement {

    private _model: SettingTab[];
    private _container: HTMLDivElement;
    private _activeIndex: number = -1;

    constructor () {
        super("div", "mde-setting-tabs");
    }

    bind(tabs: SettingTab[]) {
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

    private clearAll() {
        while (this._dom.lastChild) {
            this._dom.removeChild(this._dom.lastChild);
        }
    }

    private render() {
        this.clearAll();
        this._container = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-setting-tabs-container");
        this._dom.appendChild(this._container);

        this._model.forEach((tab: SettingTab, index: number) => {
            let elem = this.generateTabElem(tab, index);
            this._container.appendChild(elem);
        });
    }

    private generateTabElem(tab: SettingTab, index: number) : HTMLDivElement {
        let elem = DomHelper.Generic.elem<HTMLDivElement>("div", "mde-setting-tab");
        let span = DomHelper.Generic.elem<HTMLSpanElement>("span", "mde-setting-tab-name");

        span.appendChild(document.createTextNode(tab.label));
        elem.appendChild(span);

        elem.addEventListener("click", (e: MouseEvent) => {
            if (index !== this._activeIndex) {
                this.activeIndex = index;
                this.tabsClicked(tab, index);
            }
        });

        return elem;
    }

    private tabsClicked(tab: SettingTab, index: number) {
        let evt = new TabSelectedEvent(tab, index);
        this._dom.dispatchEvent(evt);
    }

    get activeIndex() {
        return this._activeIndex;
    }

    set activeIndex(index: number) {
        for (let i = 0; i < this._container.children.length; i++) {
            let child = this._container.children.item(i);
            if (i === index) {
                if (!child.classList.contains("active"))
                    child.classList.add("active");
            } else {
                if (child.classList.contains("active"))
                    child.classList.remove("active");
            }
        }
        this._activeIndex = index;
    }

}

export interface Setting
{
    tabs: SettingTab[];
}

export interface SettingTab
{
    name: string;
    label: string;
    items: SettingItem[];
}

export enum SettingItemType
{
    Text, Options, Combobox, Checkbox, Slide
}

export interface SettingItem
{
    name: string;
    label: string;
    type: SettingItemType;
    value?: any;
    options?: {name: string, label: string}[]; // enable for "Options" and "Combobox"
    onChanged?: (newValue, oldValue: any) => void;
}
