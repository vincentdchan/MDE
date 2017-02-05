import {Deque} from "../util"
import {TextEdit, TextEditType, PositionUtil, Position} from "../model"

/**
 * Containning two `deque` of `TextEdit`
 */
export class HistoryHandler {

    private _undo_history: Deque<TextEdit>;
    private _redo_history: Deque<TextEdit>;
    private _limit_size: number;

    /**
      * @param limitSize default 10
      */
    constructor(limitSize?: number) {
        this._undo_history = new Deque<TextEdit>();
        this._redo_history = new Deque<TextEdit>();
        this._limit_size = limitSize ? limitSize : 10;
    }

    pushUndo(textEdit: TextEdit) {
        this.push(this._undo_history, textEdit);
    }

    popUndo() : TextEdit {
        return this.pop(this._undo_history);
    }

    pushRedo(textEdit: TextEdit) {
        this.push(this._redo_history, textEdit);
    }

    popRedo() : TextEdit {
        return this.pop(this._redo_history);
    }

    private push(deque: Deque<TextEdit>, textEdit: TextEdit) {
        if (deque.size() === this._limit_size)  deque.pop_front();

        if (deque.empty()) {
            deque.push_back(textEdit);
        } else {
            let previous = deque.pop_back();
            if (textEdit.type === TextEditType.DeleteText && 
            previous.type === TextEditType.DeleteText && 
            PositionUtil.equalPostion(previous.range.end, textEdit.range.begin)) {
                let tmp = new TextEdit(TextEditType.DeleteText, {
                    begin: PositionUtil.clonePosition(previous.range.begin),
                    end: PositionUtil.clonePosition(textEdit.range.end),
                });
                deque.push_back(tmp);
            } else {
                deque.push_back(previous);
                deque.push_back(textEdit);
            }
        }
    }

    private pop(deque: Deque<TextEdit>) : TextEdit {
        return deque.empty() ? null : deque.pop_back();
    }

}
