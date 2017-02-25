"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class ScrollBarTrain extends util_1.DomWrapper.AbsoluteElement {
    constructor() {
        super("div", "mde-scrollbar-train");
        this.right = 0;
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
class ScrollBarView extends util_1.DomWrapper.AbsoluteElement {
    constructor(fadeOut = true, fadeOutTime = 2000) {
        super("div", "mde-scrollbar mde-box");
        this._mouseMove = null;
        this._mouseUp = null;
        this._fadeOut = fadeOut;
        this._fadeOutTime = fadeOutTime;
        this._exciteCount = 0;
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
    excite(presist = false) {
        if (this._fadeOut) {
            this._exciteCount++;
            this._train.element().classList.remove("mde-scrollbar-train-fadeOut");
            setTimeout(() => {
                this._exciteCount--;
                if (this._exciteCount === 0 && !presist) {
                    this._train.element().classList.add("mde-scrollbar-train-fadeOut");
                }
            }, this._fadeOutTime);
        }
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
        this.excite();
        this._train.top = h;
    }
    set trainPositionPercentage(per) {
        this.excite();
        if (per < 0)
            per = 0;
        else if (per > 1)
            per = 1;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTY3JvbGxCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBK0M7QUFFL0Msb0JBQXFCLFNBQVEsaUJBQVUsQ0FBQyxlQUFlO0lBRW5EO1FBQ0ksS0FBSyxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxPQUFPO0lBQ1AsQ0FBQztDQUVKO0FBRUQsb0JBQTRCLFNBQVEsS0FBSztJQUdyQyxZQUFZLElBQUk7UUFDWixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FFSjtBQVpELHdDQVlDO0FBUUQsbUJBQ0ksU0FBUSxpQkFBVSxDQUFDLGVBQWU7SUFZbEMsWUFBWSxPQUFPLEdBQUcsSUFBSSxFQUFFLFdBQVcsR0FBRyxJQUFJO1FBQzFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQVJsQyxlQUFVLEdBQW1CLElBQUksQ0FBQztRQUNsQyxhQUFRLEdBQW1CLElBQUksQ0FBQztRQVNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQWU7WUFDNUIsSUFB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
