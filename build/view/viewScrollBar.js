"use strict";
const util_1 = require("../util");
class ScrollBarTrain extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-scrollbar-rect");
        this._dom.style.background = "grey";
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
        this._dom.style.background = "lightgrey";
        this.width = ScrollBarView.DefaultWidth;
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
        if (hp < 0 || hp > 1)
            throw new Error("Data should be between 0 and 1: " + hp);
        this._train.height = this.height * hp;
    }
    set trainTop(h) {
        this._train.top = h;
    }
    set trainPositionPercentage(per) {
        if (per < 0 || per > 1)
            throw new Error("Data should be between 0 and 1: " + per);
        this._train.top = (this.height - this._train.height) * per;
    }
    set width(w) {
        super.width = w;
        this._train.width = w;
    }
    get width() {
        return super.width;
    }
    set height(h) {
        super.height = h;
        if (this.height > 0 && this._train.height > 0 && (this.height - this._train.height) > 0) {
            let oldTrainHeightPercentage = this._train.height / this.height, oldTrainTopPercentage = this._train.top / (this.height - this._train.height);
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
ScrollBarView.DefaultWidth = 18;
ScrollBarView.DefaultScrollAlpha = 0.01;
exports.ScrollBarView = ScrollBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTY3JvbGxCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUVyQyxDQUFDLENBRjZDO0FBRTlDLDZCQUE2QixnQkFBUyxDQUFDLGVBQWU7SUFFbEQ7UUFDSSxNQUFNLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDeEMsQ0FBQztJQUVELE9BQU87SUFDUCxDQUFDO0FBRUwsQ0FBQztBQUVELDZCQUFvQyxLQUFLO0lBR3JDLFlBQVksSUFBSTtRQUNaLE1BQU0sV0FBVyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7QUFFTCxDQUFDO0FBWlksc0JBQWMsaUJBWTFCLENBQUE7QUFFRCw0QkFDWSxnQkFBUyxDQUFDLGVBQWU7SUFTakM7UUFDSSxNQUFNLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQztRQUoxQixlQUFVLEdBQW1CLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQW1CLElBQUksQ0FBQztRQUtwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBRXhDLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQWU7WUFDNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFD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LEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLENBQVM7UUFDaEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUMzRCxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMscUJBQXFCLEdBQUcsd0JBQXdCLENBQUM7WUFDdEQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLHFCQUFxQixDQUFDO1FBQ3pELENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0FBRUwsQ0FBQztBQXpHMEIsMEJBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsZ0NBQWtCLEdBQUcsSUFBSSxDQUFDO0FBSnhDLHFCQUFhLGdCQTRHekIsQ0FBQSIsImZpbGUiOiJ2aWV3L3ZpZXdTY3JvbGxCYXIuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
