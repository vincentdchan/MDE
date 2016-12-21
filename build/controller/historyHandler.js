"use strict";
const util_1 = require("../util");
const model_1 = require("../model");
class HistoryHandler {
    constructor(limitSize) {
        this._history = new util_1.Deque();
        this._limit_size = limitSize ? limitSize : 10;
    }
    push(textEdit) {
        if (this._history.size() === this._limit_size)
            this._history.pop_front();
        if (this._history.empty()) {
            this._history.push_back(textEdit);
        }
        else {
            let previous = this._history.pop_back();
            if (textEdit.type === model_1.TextEditType.DeleteText &&
                previous.type === model_1.TextEditType.DeleteText &&
                model_1.PositionUtil.equalPostion(previous.range.end, textEdit.range.begin)) {
                let tmp = new model_1.TextEdit(model_1.TextEditType.DeleteText, {
                    begin: model_1.PositionUtil.clonePosition(previous.range.begin),
                    end: model_1.PositionUtil.clonePosition(textEdit.range.end),
                });
                this._history.push_back(tmp);
            }
            else {
                this._history.push_back(previous);
                this._history.push_back(textEdit);
            }
        }
    }
    pop() {
        return this._history.empty() ? null : this._history.pop_back();
    }
}
exports.HistoryHandler = HistoryHandler;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2hpc3RvcnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBb0IsU0FDcEIsQ0FBQyxDQUQ0QjtBQUM3Qix3QkFBNkQsVUFFN0QsQ0FBQyxDQUZzRTtBQUV2RTtJQVFJLFlBQVksU0FBa0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQUssRUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFrQjtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUM7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxvQkFBWSxDQUFDLFVBQVU7Z0JBQzdDLFFBQVEsQ0FBQyxJQUFJLEtBQUssb0JBQVksQ0FBQyxVQUFVO2dCQUN6QyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxnQkFBUSxDQUFDLG9CQUFZLENBQUMsVUFBVSxFQUFFO29CQUM1QyxLQUFLLEVBQUUsb0JBQVksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZELEdBQUcsRUFBRSxvQkFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25FLENBQUM7QUFFTCxDQUFDO0FBdkNZLHNCQUFjLGlCQXVDMUIsQ0FBQSIsImZpbGUiOiJjb250cm9sbGVyL2hpc3RvcnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
