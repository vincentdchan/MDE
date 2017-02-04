"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUE4Qkk7UUFuQlEseUJBQW9CLEdBQXlCLEVBQUUsQ0FBQztRQUNoRCwwQkFBcUIsR0FBMEIsRUFBRSxDQUFDO1FBbUJ0RCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFNBQVMsR0FBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdGLElBQUksQ0FBQyxZQUFZLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGFBQWEsR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRixJQUFJLENBQUMsV0FBVyxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGVBQWUsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxjQUFjLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsaUJBQWlCLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFR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QztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztBQUVMLENBQUM7QUE3SWtCLGtCQUFRLEdBQWMsSUFBSSxDQUFDO0FBRmpDLGlCQUFTLFlBK0lyQixDQUFBO0FBRUQ7SUFLSSxZQUFZLE9BQWUsRUFBRSxNQUFNLEdBQVksSUFBSTtRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7QUFFTCxDQUFDO0FBbEJZLG1CQUFXLGNBa0J2QixDQUFBO0FBRUQ7SUFNSSxZQUFZLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxLQUFjO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUMzQixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBeEJZLG9CQUFZLGVBd0J4QixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvc2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
