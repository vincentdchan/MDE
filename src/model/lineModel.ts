
export class LineModel {

    protected _number : number;
    protected _text : string;

    private _insertEventHandlers : Array<(LineModel, Event) => void>;
    private _deleteEventHandlers : Array<(LineModel, Event) => void>;

    constructor(_num : number, _t : string) {
        this._number = _num | 0;
        this._text = _t;

        this._insertEventHandlers = new Array<(LineModel, Event)=>void>();
        this._deleteEventHandlers = new Array<(LineModel, Event)=>void>();
    }

    insert(index : number, content : string) {
        let before = this._text.slice(0, index);
        let after = this._text.slice(index);

        this._text = before + content + after;

        this.fireInsertEvent(this, null);
    }

    delete(begin : number, end : number) {
        let before = this._text.slice(0, begin);
        let after = this._text.slice(end);

        this._text = before + after;
        this.fireDeleteEvent(this, null);
    }

    private fireInsertEvent(m : LineModel, e : Event) {
        for (let i = 0; i < this._insertEventHandlers.length; ++i) {
            this._insertEventHandlers[i](m ,e);
        }
    }

    private fireDeleteEvent(m : LineModel, e : Event) {
        for (let i = 0; i < this._deleteEventHandlers.length; ++i) {
            this._deleteEventHandlers[i](m, e);
        }
    }

    onInsert(_fun : (LineModel, Event) => void) {
        this._insertEventHandlers.push(_fun);
    }

    onDelete(_fun : (LineModel, Event) => void) {
        this._deleteEventHandlers.push(_fun);
    }
    
    get text() {
        return this._text;
    }
    
    set text(_t : string) {
        this._text = _t
    }

    get number() {
        return this._number;
    }

    set number(num : number) {
        this._number = num;
    }
    
    get length() {
        return this._text.length;
    }

}
