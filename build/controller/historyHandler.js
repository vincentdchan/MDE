"use strict";
const util_1 = require("../util");
const model_1 = require("../model");
class HistoryHandler {
    constructor(limitSize) {
        this._undo_history = new util_1.Deque();
        this._redo_history = new util_1.Deque();
        this._limit_size = limitSize ? limitSize : 10;
    }
    pushUndo(textEdit) {
        this.push(this._undo_history, textEdit);
    }
    popUndo() {
        return this.pop(this._undo_history);
    }
    pushRedo(textEdit) {
        this.push(this._redo_history, textEdit);
    }
    popRedo() {
        return this.pop(this._redo_history);
    }
    push(deque, textEdit) {
        if (deque.size() === this._limit_size)
            deque.pop_front();
        if (deque.empty()) {
            deque.push_back(textEdit);
        }
        else {
            let previous = deque.pop_back();
            if (textEdit.type === model_1.TextEditType.DeleteText &&
                previous.type === model_1.TextEditType.DeleteText &&
                model_1.PositionUtil.equalPostion(previous.range.end, textEdit.range.begin)) {
                let tmp = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                    begin: model_1.PositionUtil.clonePosition(previous.range.begin),
                    end: model_1.PositionUtil.clonePosition(textEdit.range.end),
                });
                deque.push_back(tmp);
            }
            else {
                deque.push_back(previous);
                deque.push_back(textEdit);
            }
        }
    }
    pop(deque) {
        return deque.empty() ? null : deque.pop_back();
    }
}
exports.HistoryHandler = HistoryHandler;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2hpc3RvcnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrQ0FBNkI7QUFDN0Isb0NBQXVFO0FBS3ZFO0lBU0ksWUFBWSxTQUFrQjtRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBSyxFQUFZLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQUssRUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFrQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFrQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU87UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVPLElBQUksQ0FBQyxLQUFzQixFQUFFLFFBQWtCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTFELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxvQkFBWSxDQUFDLFVBQVU7Z0JBQzdDLFFBQVEsQ0FBQyxJQUFJLEtBQUssb0JBQVksQ0FBQyxVQUFVO2dCQUN6QyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxnQkFBUSxDQUFDLG9CQUFZLENBQUMsVUFBVSxFQUFFO29CQUM1QyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZELEdBQUcsRUFBRSxvQkFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU8sR0FBRyxDQUFDLEtBQXNCO1FBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0NBRUo7QUF6REQsd0NBeURDIiwiZmlsZSI6ImNvbnRyb2xsZXIvaGlzdG9yeUhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
