import {ImmutableArray} from "../../util"

// Immutable
export class VirtualWord {

    private _classList: ImmutableArray<string>
    private _text: string;

    constructor(_text: string | VirtualWord, _classList?: ImmutableArray<string>) {
        if (typeof _text == "string")
            this._text = _text;
        else if (_text instanceof VirtualWord) {
            this._text = _text._text;
            this._classList = new ImmutableArray(_text._classList);
        }

        this._classList = _classList;
    }

    get text() {
        return this._text;
    }

    get classList() {
        return this._classList;
    }

}
