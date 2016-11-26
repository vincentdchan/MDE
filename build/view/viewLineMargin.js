"use strict";
const util_1 = require("../util");
class LineMarginView extends util_1.DomHelper.AppendableDomWrapper {
    constructor() {
        super("div", "mde-line-margin");
        this._dom.style.width = 30 + "px";
    }
    dispose() {
        if (this._dom != null) {
            this._dom.remove();
            this._dom = null;
        }
    }
    get width() {
        let str = this._dom.style.width;
        return str == "" ? 0 : parseInt(str);
    }
    set width(w) {
        this._dom.style.width = w + "px";
    }
}
exports.LineMarginView = LineMarginView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdMaW5lTWFyZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBcUMsU0FFckMsQ0FBQyxDQUY2QztBQUU5Qyw2QkFBb0MsZ0JBQVMsQ0FBQyxvQkFBb0I7SUFFOUQ7UUFDSSxNQUFNLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsQ0FBVTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0FBRUwsQ0FBQztBQXhCWSxzQkFBYyxpQkF3QjFCLENBQUEiLCJmaWxlIjoidmlldy92aWV3TGluZU1hcmdpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
