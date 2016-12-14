"use strict";
class ScrollHeightChangedEvent extends Event {
    constructor(newHeight, oldHeight) {
        super("scrollHeightChanged");
        this._scroll_height = newHeight;
        this._old_height = oldHeight;
    }
    get newHeight() {
        return this._scroll_height;
    }
    get oldHeight() {
        return this._old_height;
    }
}
exports.ScrollHeightChangedEvent = ScrollHeightChangedEvent;
class CursorMoveEvent extends Event {
    constructor(pos, abs_co) {
        super("cursorMove");
        this._pos = pos;
        this._co = abs_co;
    }
    get position() {
        return this._pos;
    }
    get absoluteCoordinate() {
        return this._co;
    }
}
exports.CursorMoveEvent = CursorMoveEvent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsdUNBQThDLEtBQUs7SUFLL0MsWUFBWSxTQUFpQixFQUFFLFNBQWtCO1FBQzdDLE1BQU0scUJBQXFCLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7QUFFTCxDQUFDO0FBcEJZLGdDQUF3QiwyQkFvQnBDLENBQUE7QUFFRCw4QkFBcUMsS0FBSztJQUt0QyxZQUFZLEdBQWEsRUFBRSxNQUFrQjtRQUN6QyxNQUFNLFlBQVksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztBQUVMLENBQUM7QUFuQlksdUJBQWUsa0JBbUIzQixDQUFBIiwiZmlsZSI6InZpZXcvZXZlbnRzLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
