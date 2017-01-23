import {IDisposable, DomHelper, TickTockPair, TickTockUtil, i18n as $} from "../util"
import {Coordinate, IHidable} from "."
import {ButtonView} from "./viewButton"

export class SettingView extends DomHelper.FixedElement implements IDisposable {

    private _showed: boolean = false;
    private _model: Setting;
    private _tabs: SettingTabsView;
    private _closeButton: ButtonView;
    private _titleBar: HTMLElement;

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

        this._dom.style.zIndex = "100";
        this.render();
    }

    bind(setting: Setting) {

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

    private render() {
        if (this._showed) {
            this._dom.style.display = "block";
        } else {
            this._dom.style.display = "none";
        }
    }

    dispose() {

    }

}

export class SettingTabsView extends DomHelper.AppendableDomWrapper {

    constructor () {
        super("div", "setting-tabs");
    }

}

export interface Setting
{
    tabs: SettingTab[];
}

export interface SettingTab
{
    name: string;
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
    default?: any;
    options?: string; // enable for "Options" and "Combobox"
}

let items: SettingItem[] = [ {
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
]
