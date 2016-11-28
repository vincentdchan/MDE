"use strict";
const util_1 = require("../util");
class AbsoluteButton extends util_1.DomHelper.AbsoluteElement {
    constructor(width, height) {
        super("div", "mde-button");
        this.width = width;
        this.height = height;
        this._dom.style.display = "inline-block";
        this._dom.style.cursor = "pointer";
    }
    setText(content) {
        let span = util_1.DomHelper.elem("span", "mde-button-content");
        span.innerHTML = content;
        this.setContent(span);
    }
    setContent(elem) {
        if (this._dom.children.length > 0) {
            this._dom.firstElementChild.remove();
        }
        this._dom.appendChild(elem);
    }
    get spanContent() {
        if (this._dom.children.length > 0) {
            return this._dom.firstElementChild;
        }
        throw new Error("There no span content.");
    }
    get background() {
        return this._dom.style.background;
    }
    set background(content) {
        this._dom.style.background = content;
    }
    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
exports.AbsoluteButton = AbsoluteButton;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdCdXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUVyQyxDQUFDLENBRjZDO0FBRTlDLDZCQUFvQyxnQkFBUyxDQUFDLGVBQWU7SUFFekQsWUFBWSxLQUFhLEVBQUUsTUFBYztRQUNyQyxNQUFNLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlO1FBQ25CLElBQUksSUFBSSxHQUFvQixnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBcUI7UUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBa0IsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUN4RCxDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxPQUFlO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDekMsQ0FBQztJQUVELE9BQU87UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO0lBQ0wsQ0FBQztBQUVMLENBQUM7QUE5Q1ksc0JBQWMsaUJBOEMxQixDQUFBIiwiZmlsZSI6InZpZXcvdmlld0J1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
