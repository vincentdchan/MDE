"use strict";
const util_1 = require("../util");
class SearchBox {
    constructor() {
        this._searchEventHandlers = [];
        this._replaceEventHandlers = [];
        this._elem = document.getElementById("searchbox");
        this._closeBtn = this._elem.getElementsByClassName("searchbox-titlebar-btn")[0];
        this._searchInput = this._elem.getElementsByTagName("input")[0];
        this._replaceInput = this._elem.getElementsByTagName("input")[1];
        this._nextButton = document.getElementById("searchbox-next-btn");
        this._previousButton = document.getElementById("searchbox-previous-btn");
        this._replaceButton = document.getElementById("searchbox-replace-btn");
        this._replaceAllButton = document.getElementById("searchbox-replaceall-btn");
        this._closeBtn.addEventListener("click", (e) => this.handleClose(e));
        this._searchInput.addEventListener("input", (e) => this.handleSearchInputChanged(e));
        this._replaceInput.addEventListener("input", (e) => this.handleReplaceInputChanged(e));
        this._searchInput.addEventListener("keydown", (e) => this.handleSearchInputKeyDown(e));
        this._replaceInput.addEventListener("keydown", (e) => this.handleReplaceInputKeyDown(e));
        this._nextButton.addEventListener("click", (e) => this.handleNextButtonClicked(e));
        this._previousButton.addEventListener("click", (e) => this.handlePreviousButtonClicked(e));
        this._replaceButton.addEventListener("click", (e) => this.handleReplaceButtonClicked(e));
        this._replaceAllButton.addEventListener("click", (e) => this.handleReplaceAllButtonClicked(e));
        this.display = false;
    }
    static GetOne() {
        if (SearchBox._onlyOne === null) {
            SearchBox._onlyOne = new SearchBox();
        }
        return SearchBox._onlyOne;
    }
    onSearchEvent(handler) {
        this._searchEventHandlers.push(handler);
    }
    onReplaceEvent(handler) {
        this._replaceEventHandlers.push(handler);
    }
    handleClose(e) {
        this.display = false;
    }
    handleSearchInputChanged(e) {
        this._searchInputContent = this._searchInput.value;
    }
    handleReplaceInputChanged(e) {
        this._replaceInputContent = this._replaceInput.value;
    }
    handleSearchInputKeyDown(e) {
        if (e.keyCode === util_1.KeyCode.Enter) {
            let evt = new SearchEvent(this.searchInputContent, true);
            this._searchEventHandlers.forEach((h) => h.call(undefined, evt));
        }
    }
    handleReplaceInputKeyDown(e) {
        if (e.keyCode === util_1.KeyCode.Enter) {
            let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, false);
            this._replaceEventHandlers.forEach((h) => h.call(undefined, evt));
        }
    }
    handleNextButtonClicked(e) {
        let evt = new SearchEvent(this.searchInputContent, true);
        this._searchEventHandlers.forEach((h) => h.call(undefined, evt));
    }
    handlePreviousButtonClicked(e) {
        let evt = new SearchEvent(this.searchInputContent, false);
        this._searchEventHandlers.forEach((h) => h.call(undefined, evt));
    }
    handleReplaceButtonClicked(e) {
        let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, false);
        this._replaceEventHandlers.forEach((h) => h.call(undefined, evt));
    }
    handleReplaceAllButtonClicked(e) {
        let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, true);
        this._replaceEventHandlers.forEach((h) => h.call(undefined, evt));
    }
    set width(w) {
        if (w !== this._width) {
            this._width = w;
            this._elem.style.width = w + "px";
        }
    }
    get width() {
        return this._width;
    }
    set display(b) {
        if (b !== this._display) {
            this._display = b;
            if (b) {
                this._elem.classList.add("active");
            }
            else {
                this._elem.classList.remove("active");
            }
        }
    }
    get display() {
        return this._display;
    }
    get searchInputContent() {
        return this._searchInputContent;
    }
    get replaceInputContent() {
        return this._replaceInputContent;
    }
    get searchInput() {
        return this._searchInput;
    }
    get replaceInput() {
        return this._replaceInput;
    }
    get closeButton() {
        return this._closeBtn;
    }
}
SearchBox._onlyOne = null;
exports.SearchBox = SearchBox;
class SearchEvent {
    constructor(content, isNext = true) {
        this._content = content;
        this._isNext = isNext;
    }
    get content() {
        return this._content;
    }
    get isNext() {
        return this._isNext;
    }
}
exports.SearchEvent = SearchEvent;
class ReplaceEvent {
    constructor(srcContent, targetContent, isAll) {
        this._srcContent = srcContent;
        this._targetContent = targetContent;
        this._isAll = isAll;
    }
    get sourceContent() {
        return this._srcContent;
    }
    get targetContent() {
        return this._targetContent;
    }
    get isAll() {
        return this._isAll;
    }
}
exports.ReplaceEvent = ReplaceEvent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXNCLFNBRXRCLENBQUMsQ0FGOEI7QUFFL0I7SUE4Qkk7UUFuQlEseUJBQW9CLEdBQXlCLEVBQUUsQ0FBQztRQUNoRCwwQkFBcUIsR0FBMEIsRUFBRSxDQUFDO1FBbUJ0RCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFNBQVMsR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdGLElBQUksQ0FBQyxZQUFZLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGFBQWEsR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRixJQUFJLENBQUMsV0FBVyxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxjQUFjLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsaUJBQWlCLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxn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SUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxtQkFBbUI7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0FBRUwsQ0FBQztBQTdKa0Isa0JBQVEsR0FBYyxJQUFJLENBQUM7QUFGakMsaUJBQVMsWUErSnJCLENBQUE7QUFFRDtJQUtJLFlBQVksT0FBZSxFQUFFLE1BQU0sR0FBWSxJQUFJO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztBQUVMLENBQUM7QUFsQlksbUJBQVcsY0FrQnZCLENBQUE7QUFFRDtJQU1JLFlBQVksVUFBa0IsRUFBRSxhQUFxQixFQUFFLEtBQWM7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztBQUVMLENBQUM7QUF4Qlksb0JBQVksZUF3QnhCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9zZWFyY2hCb3guanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
