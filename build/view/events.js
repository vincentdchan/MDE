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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsOEJBQXNDLFNBQVEsS0FBSztJQUsvQyxZQUFZLFNBQWlCLEVBQUUsU0FBa0I7UUFDN0MsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDakMsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBRUo7QUFwQkQsNERBb0JDO0FBRUQscUJBQTZCLFNBQVEsS0FBSztJQUt0QyxZQUFZLEdBQWEsRUFBRSxNQUFrQjtRQUN6QyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUFuQkQsMENBbUJDIiwiZmlsZSI6InZpZXcvZXZlbnRzLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
