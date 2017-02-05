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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2hpc3RvcnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBb0IsU0FDcEIsQ0FBQyxDQUQ0QjtBQUM3Qix3QkFBNkQsVUFLN0QsQ0FBQyxDQUxzRTtBQUt2RTtJQVNJLFlBQVksU0FBa0I7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQUssRUFBWSxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFLLEVBQVksQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxRQUFRLENBQUMsUUFBa0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBa0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTyxJQUFJLENBQUMsS0FBc0IsRUFBRSxRQUFrQjtRQUNuRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUxRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssb0JBQVksQ0FBQyxVQUFVO2dCQUM3QyxRQUFRLENBQUMsSUFBSSxLQUFLLG9CQUFZLENBQUMsVUFBVTtnQkFDekMsb0JBQVksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksR0FBRyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxvQkFBWSxDQUFDLFVBQVUsRUFBRTtvQkFDNUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2RCxHQUFHLEVBQUUsb0JBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ3RELENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLEdBQUcsQ0FBQyxLQUFzQjtRQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsQ0FBQztBQUVMLENBQUM7QUF6RFksc0JBQWMsaUJBeUQxQixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvaGlzdG9yeUhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
