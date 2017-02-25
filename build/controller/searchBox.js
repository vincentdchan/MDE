"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        else if (e.keyCode === util_1.KeyCode.Tab) {
            e.preventDefault();
            this._replaceInput.focus();
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
    set searchInputContent(data) {
        this._searchInput.value = data;
        this._searchInputContent = data;
    }
    get replaceInputContent() {
        return this._replaceInputContent;
    }
    set replaceInputContent(data) {
        this._replaceInput.value = data;
        this._replaceInputContent = data;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3NlYXJjaEJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUErQjtBQWUvQjtJQThCSTtRQW5CUSx5QkFBb0IsR0FBeUIsRUFBRSxDQUFDO1FBQ2hELDBCQUFxQixHQUEwQixFQUFFLENBQUM7UUFtQnRELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsU0FBUyxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0YsSUFBSSxDQUFDLFlBQVksR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsYUFBYSxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5GLElBQUksQ0FBQyxXQUFXLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsZUFBZSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLGNBQWMsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxpQkFBaUIsR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRWhHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8s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QztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0NBRUo7QUF0QkQsa0NBc0JDO0FBRUQ7SUFNSSxZQUFZLFVBQWtCLEVBQUUsYUFBcUIsRUFBRSxLQUFjO1FBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUMzQixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FFSjtBQXhCRCxvQ0F3QkMiLCJmaWxlIjoiY29udHJvbGxlci9zZWFyY2hCb3guanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
