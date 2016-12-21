"use strict";
const util_1 = require("../util");
class HistoryHandler {
    constructor(limitSize) {
        this._history = new util_1.Deque();
        this._limit_size = limitSize ? limitSize : 10;
    }
    push(textEdit) {
        if (this._history.size() === this._limit_size)
            this._history.pop_front();
        this._history.push_back(textEdit);
    }
    pop() {
        return this._history.empty() ? null : this._history.pop_back();
    }
}
exports.HistoryHandler = HistoryHandler;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2hpc3RvcnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBb0IsU0FDcEIsQ0FBQyxDQUQ0QjtBQUc3QjtJQVFJLFlBQVksU0FBa0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQUssRUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFrQjtRQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUM7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxHQUFHO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkUsQ0FBQztBQUVMLENBQUM7QUF0Qlksc0JBQWMsaUJBc0IxQixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvaGlzdG9yeUhhbmRsZXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
