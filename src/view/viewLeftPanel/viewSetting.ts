import {DomWrapper, IDisposable} from "../../util"

export enum SettingOptionType {
    Header, Toggle, TextInput, TextArea
}

export interface SettingItemOption {
    name: string;
    type: SettingOptionType;
    default: any;
    text?: string;
    description?: string;
    onChanged: (evt: Event) => void;
}

export function isSettingItemOption(obj: any) : obj is SettingItemOption {
    return (obj.name && obj.type) && (typeof obj.name === "string" && typeof obj.type === "object");
}

class SettingItemView extends DomWrapper.AbsoluteElement implements IDisposable {

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

type SettingItemViewOption = SettingItemOption | "splitter";

export class SettingView extends DomWrapper.AbsoluteElement implements IDisposable {

    private _items : SettingItemView[];

    constructor(options: SettingItemViewOption[]) {
        super("div", "mde-setting");

        options.forEach((option: SettingItemViewOption) => {
            if (option === "splitter") {

            } else {
                let op = <SettingItemOption>option;
            }
        })
    }

    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }

}
