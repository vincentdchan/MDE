
export enum TokenType {
    Tab, Space, Hash, Star, HtmlTag, GT, 
    ShortBar, Text, Number, LineBreak,
}

export class Token {

    private _type : TokenType;
    private _text : string

    constructor(_type : TokenType, _text? : string ) {
        this._type = _type;
        if (_text) {
            this._text = _text;
        } else {
            this._text = null;
        }
    }

    get type() {
        return this._type;
    }

    get text() {
        return this._text;
    }

}
