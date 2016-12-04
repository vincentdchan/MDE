import {DomHelper, IDisposable} from "../util"

class ScrollBarTrain extends DomHelper.AbsoluteElement implements IDisposable {

    constructor() {
        super("div", "mde-scrollbar-rect");
        this._dom.style.background = "grey";
        this._dom.style.opacity = "0.5"
    }

    dispose() {
    }

}

export class TrainMoveEvent extends Event {
    private _percentage : number;

    constructor(_per) {
        super("trainMove");
        this._percentage = _per;
    }

    get percentage() {
        return this._percentage;
    }

}

export class ScrollBarView 
    extends DomHelper.AbsoluteElement implements IDisposable {

    public static readonly DefaultWidth = 18;
    public static readonly DefaultScrollAlpha = 0.01;

    private _train: ScrollBarTrain;
    private _mouseMove : EventListener = null;
    private _mouseUp : EventListener = null;

    constructor() {
        super("div", "mde-scrollbar");

        this._train = new ScrollBarTrain();
        this._train.appendTo(this._dom);

        this._dom.style.background = "lightgrey";
        this.width = ScrollBarView.DefaultWidth;

        let clickOffset: number = 0;
        let mouseMove = (evt: MouseEvent) => {
            let rect = this._dom.getBoundingClientRect(),
                trainTop = evt.clientY - clickOffset - rect.top,
                percentage = trainTop / (this.height - this._train.height);

            if (percentage < ScrollBarView.DefaultScrollAlpha) {
                percentage = 0;
            } else if (percentage > (1 - ScrollBarView.DefaultScrollAlpha)) {
                percentage = 1;
            }

            if (percentage >= 0 && percentage <= 1) {
                this.trainPositionPercentage = percentage;

                let event = new TrainMoveEvent(percentage);
                this._dom.dispatchEvent(event);
            }
        }

        this._train.on("mousedown", (evt: MouseEvent) => {
            evt.preventDefault();
            window.addEventListener("mousemove", mouseMove, true);
            this._mouseMove = mouseMove;

            clickOffset = evt.offsetY;
        });

        this._mouseUp = (evt: MouseEvent) => {
            window.removeEventListener("mousemove", mouseMove, true);
            this._mouseMove = null;
        }

        window.addEventListener("mouseup", this._mouseUp, true);

    }

    set trainHeight(h: number) {
        this._train.height = h;
    }

    set trainHeightPercentage(hp: number) {
        if (hp < 0 || hp > 1)
            throw new Error("Data should be between 0 and 1: " + hp);
        this._train.height = this.height * hp;
    }

    set trainTop(h: number) {
        this._train.top = h;
    }

    set trainPositionPercentage(per: number) {
        if (per < 0 || per > 1)
            throw new Error("Data should be between 0 and 1: " + per);
        this._train.top = (this.height - this._train.height) * per;
    }

    set width(w : number) {
        super.width = w;
        this._train.width = w;
    }

    get width() {
        return super.width;
    }

    set height(h: number) {
        super.height = h;
        if (this.height > 0 && this._train.height > 0 && (this.height - this._train.height) > 0) {
            let oldTrainHeightPercentage = this._train.height / this.height,
                oldTrainTopPercentage = this._train.top / (this.height - this._train.height);

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
