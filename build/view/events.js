"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhCQUFzQyxTQUFRLEtBQUs7SUFLL0MsWUFBWSxTQUFpQixFQUFFLFNBQWtCO1FBQzdDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztDQUVKO0FBcEJELDREQW9CQztBQUVELHFCQUE2QixTQUFRLEtBQUs7SUFLdEMsWUFBWSxHQUFhLEVBQUUsTUFBa0I7UUFDekMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUVKO0FBbkJELDBDQW1CQyIsImZpbGUiOiJ2aWV3L2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
