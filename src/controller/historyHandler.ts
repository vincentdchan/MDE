import {Deque} from "../util"
import {TextEdit, TextEditType, PositionUtil, Position} from "../model"

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

        if (this._history.empty()) {
            this._history.push_back(textEdit);
        } else {
            let previous = this._history.pop_back();
            if (textEdit.type === TextEditType.DeleteText && 
            previous.type === TextEditType.DeleteText && 
            PositionUtil.equalPostion(previous.range.end, textEdit.range.begin)) {
                let tmp = new TextEdit(TextEditType.DeleteText, {
                    begin: PositionUtil.clonePosition(previous.range.begin),
                    end: PositionUtil.clonePosition(textEdit.range.end),
                });
                this._history.push_back(tmp);
            } else {
                this._history.push_back(previous);
                this._history.push_back(textEdit);
            }
        }
    }

    pop() : TextEdit {
        return this._history.empty() ? null : this._history.pop_back();
    }

}
