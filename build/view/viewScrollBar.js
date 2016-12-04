"use strict";
const util_1 = require("../util");
class ScrollBarTrain extends util_1.DomHelper.AbsoluteElement {
    constructor() {
        super("div", "mde-scrollbar-rect");
        this._dom.style.background = "grey";
        this._dom.style.opacity = "0.5";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTY3JvbGxCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUVyQyxDQUFDLENBRjZDO0FBRTlDLDZCQUE2QixnQkFBUyxDQUFDLGVBQWU7SUFFbEQ7UUFDSSxNQUFNLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtJQUNuQyxDQUFDO0lBRUQsT0FBTztJQUNQLENBQUM7QUFFTCxDQUFDO0FBRUQsNkJBQW9DLEtBQUs7SUFHckMsWUFBWSxJQUFJO1FBQ1osTUFBTSxXQUFXLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztBQUVMLENBQUM7QUFaWSxzQkFBYyxpQkFZMUIsQ0FBQTtBQUVELDRCQUNZLGdCQUFTLENBQUMsZUFBZTtJQVNqQztRQUNJLE1BQU0sS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSjFCLGVBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBbUIsSUFBSSxDQUFDO1FBS3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFeEMsSUFBSSxXQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQzVC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SUFDL0QsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLENBQVU7UUFDaEIsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBUztRQUNoQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLHdCQUF3QixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQzNELHFCQUFxQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpGLElBQUksQ0FBQyxxQkFBcUIsR0FBRyx3QkFBd0IsQ0FBQztZQUN0RCxJQUFJLENBQUMsdUJBQXVCLEdBQUcscUJBQXFCLENBQUM7UUFDekQsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7QUFFTCxDQUFDO0FBekcwQiwwQkFBWSxHQUFHLEVBQUUsQ0FBQztBQUNsQixnQ0FBa0IsR0FBRyxJQUFJLENBQUM7QUFKeEMscUJBQWEsZ0JBNEd6QixDQUFBIiwiZmlsZSI6InZpZXcvdmlld1Njcm9sbEJhci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
