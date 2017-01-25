"use strict";
const util_1 = require("../util");
class ScrollBarTrain extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-scrollbar-train");
    }
    dispose() {
    }
}
class TrainMoveEvent extends Event {
    constructor(_per) {
        super("trainMove");
        this._percentage = _per;
    }
    get percentage() {
        return this._percentage;
    }
}
exports.TrainMoveEvent = TrainMoveEvent;
class ScrollBarView extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-scrollbar");
        this._mouseMove = null;
        this._mouseUp = null;
        this._train = new ScrollBarTrain();
        this._train.appendTo(this._dom);
        let clickOffset = 0;
        let mouseMove = (evt) => {
            let rect = this._dom.getBoundingClientRect(), trainTop = evt.clientY - clickOffset - rect.top, percentage = trainTop / (this.height - this._train.height);
            if (percentage < ScrollBarView.DefaultScrollAlpha) {
                percentage = 0;
            }
            else if (percentage > (1 - ScrollBarView.DefaultScrollAlpha)) {
                percentage = 1;
            }
            if (percentage >= 0 && percentage <= 1) {
                this.trainPositionPercentage = percentage;
                let event = new TrainMoveEvent(percentage);
                this._dom.dispatchEvent(event);
            }
        };
        this._train.on("mousedown", (evt) => {
            evt.preventDefault();
            window.addEventListener("mousemove", mouseMove, true);
            this._mouseMove = mouseMove;
            clickOffset = evt.offsetY;
        });
        this._mouseUp = (evt) => {
            window.removeEventListener("mousemove", mouseMove, true);
            this._mouseMove = null;
        };
        window.addEventListener("mouseup", this._mouseUp, true);
    }
    set trainHeight(h) {
        this._train.height = h;
    }
    set trainHeightPercentage(hp) {
        hp = Math.floor(hp * 100) / 100;
        if (hp < 0 || hp > 1)
            throw new Error("Data should be between 0 and 1: " + hp);
        this._train.height = this.height * hp;
    }
    set trainTop(h) {
        this._train.top = h;
    }
    set trainPositionPercentage(per) {
        per = Math.floor(per * 10000) / 10000;
        if (per < 0 || per > 1)
            throw new Error("Data should be between 0 and 1: " + per);
        this._train.top = (this.height - this._train.height) * per;
    }
    set width(w) {
        throw new Error("Do not try to set width of scrollbar, set it in css.");
    }
    get width() {
        return super.width;
    }
    set height(h) {
        let oldTrainHeightPercentage = this._train.height / this.height, oldTrainTopPercentage = this._train.top / (this.height - this._train.height);
        super.height = h;
        if (this.height > 0 && this._train.height > 0 && (this.height - this._train.height) > 0) {
            this.trainHeightPercentage = oldTrainHeightPercentage;
            this.trainPositionPercentage = oldTrainTopPercentage;
        }
    }
    get height() {
        return super.height;
    }
    dispose() {
        this._train.dispose();
        if (this._mouseMove !== null) {
            window.removeEventListener("mousemove", this._mouseMove, true);
        }
        window.removeEventListener("mouseup", this._mouseUp, true);
    }
}
ScrollBarView.DefaultScrollAlpha = 0.01;
exports.ScrollBarView = ScrollBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTY3JvbGxCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUVyQyxDQUFDLENBRjZDO0FBRTlDLDZCQUE2QixnQkFBUyxDQUFDLGVBQWU7SUFFbEQ7UUFDSSxNQUFNLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPO0lBQ1AsQ0FBQztBQUVMLENBQUM7QUFFRCw2QkFBb0MsS0FBSztJQUdyQyxZQUFZLElBQUk7UUFDWixNQUFNLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0FBRUwsQ0FBQztBQVpZLHNCQUFjLGlCQVkxQixDQUFBO0FBS0QsNEJBQ1ksZ0JBQVMsQ0FBQyxlQUFlO0lBUWpDO1FBQ0ksTUFBTSxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKMUIsZUFBVSxHQUFtQixJQUFJLENBQUM7UUFDbEMsYUFBUSxHQUFtQixJQUFJLENBQUM7UUFLcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxJQUFJLFdBQVcsR0FBVyxDQUFDLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFlO1lBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFDeEMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQy9DLFVBQVUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFB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
