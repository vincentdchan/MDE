import {Deque} from "../util"
import {TextEdit} from "../model"

export class HistoryHandler {

    private _history: Deque<TextEdit>;
    private _limit_size: number;

    ///
    /// limitSize: default 10
    ///
    constructor(limitSize?: number) {
        this._history = new Deque<TextEdit>();
        this._limit_size = limitSize ? limitSize : 10;
    }

    push(textEdit: TextEdit) {
        if (this._history.size() === this._limit_size)  this._history.pop_front();
        this._history.push_back(textEdit);
    }

    pop() : TextEdit {
        return this._history.empty() ? null : this._history.pop_back();
    }

}
