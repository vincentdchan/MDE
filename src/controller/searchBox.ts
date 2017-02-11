import {KeyCode} from "../util"

/**
  * Searchbox doesn't reply on the common view component
  * in this project.
  * it just replies on the HTML dom api to handle.
  *
  * Use `SearchBox.GetOne()` to get a gobal SearchBox instance,
  * using `new` to create an instance is not working.
  *
  * There are two events to listen
  * - Search
  * - Replace
  *
  */
export class SearchBox {

    private static _onlyOne: SearchBox = null;

    public static GetOne() {
        if (SearchBox._onlyOne === null) {
            SearchBox._onlyOne = new SearchBox();
        }
        return SearchBox._onlyOne;
    }

    private _searchEventHandlers: SearchEventHandler[] = [];
    private _replaceEventHandlers: ReplaceEventHandler[] = [];

    private _width: number;
    private _display: boolean;

    private _elem: HTMLElement;
    private _closeBtn: HTMLElement;
    private _searchInput: HTMLInputElement;
    private _replaceInput: HTMLInputElement;

    private _nextButton: HTMLButtonElement;
    private _previousButton: HTMLButtonElement;
    private _replaceButton: HTMLButtonElement;
    private _replaceAllButton: HTMLButtonElement;

    private _searchInputContent: string;
    private _replaceInputContent: string;

    private constructor() {
        this._elem = document.getElementById("searchbox");

        this._closeBtn = <HTMLElement>this._elem.getElementsByClassName("searchbox-titlebar-btn")[0];

        this._searchInput = <HTMLInputElement>this._elem.getElementsByTagName("input")[0];
        this._replaceInput = <HTMLInputElement>this._elem.getElementsByTagName("input")[1];

        this._nextButton = <HTMLButtonElement>document.getElementById("searchbox-next-btn");
        this._previousButton = <HTMLButtonElement>document.getElementById("searchbox-previous-btn");
        this._replaceButton = <HTMLButtonElement>document.getElementById("searchbox-replace-btn");
        this._replaceAllButton = <HTMLButtonElement>document.getElementById("searchbox-replaceall-btn");

        this._closeBtn.addEventListener("click", (e: MouseEvent) => this.handleClose(e));
        this._searchInput.addEventListener("input", (e: Event) => this.handleSearchInputChanged(e));
        this._replaceInput.addEventListener("input", (e: Event) => this.handleReplaceInputChanged(e));
        this._searchInput.addEventListener("keydown", (e: KeyboardEvent) => this.handleSearchInputKeyDown(e));
        this._replaceInput.addEventListener("keydown", (e: KeyboardEvent) => this.handleReplaceInputKeyDown(e));
        this._nextButton.addEventListener("click", (e: MouseEvent) => this.handleNextButtonClicked(e));
        this._previousButton.addEventListener("click", (e: MouseEvent) => this.handlePreviousButtonClicked(e));
        this._replaceButton.addEventListener("click", (e: MouseEvent) => this.handleReplaceButtonClicked(e));
        this._replaceAllButton.addEventListener("click", (e: MouseEvent) => this.handleReplaceAllButtonClicked(e));

        this.display = false;
    }

    onSearchEvent(handler: SearchEventHandler) {
        this._searchEventHandlers.push(handler);
    }

    onReplaceEvent(handler: ReplaceEventHandler) {
        this._replaceEventHandlers.push(handler);
    }

    private handleClose(e: MouseEvent) {
        this.display = false;
    }

    private handleSearchInputChanged(e: Event) {
        this._searchInputContent = this._searchInput.value;
    }

    private handleReplaceInputChanged(e: Event) {
        this._replaceInputContent = this._replaceInput.value;
    }

    private handleSearchInputKeyDown(e: KeyboardEvent) {
        if (e.keyCode === KeyCode.Enter) {
            let evt = new SearchEvent(this.searchInputContent, true);
            this._searchEventHandlers.forEach((h: SearchEventHandler) => h.call(undefined, evt));
        }
    }

    private handleReplaceInputKeyDown(e: KeyboardEvent) {
        if (e.keyCode === KeyCode.Enter) {
            let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, false);
            this._replaceEventHandlers.forEach((h: ReplaceEventHandler) => h.call(undefined, evt));
        }
    }

    private handleNextButtonClicked(e: MouseEvent) {
        let evt = new SearchEvent(this.searchInputContent, true);
        this._searchEventHandlers.forEach((h: SearchEventHandler) => h.call(undefined, evt));
    }

    private handlePreviousButtonClicked(e: MouseEvent) {
        let evt = new SearchEvent(this.searchInputContent, false);
        this._searchEventHandlers.forEach((h: SearchEventHandler) => h.call(undefined, evt));
    }

    private handleReplaceButtonClicked(e: MouseEvent) {
        let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, false);
        this._replaceEventHandlers.forEach((h: ReplaceEventHandler) => h.call(undefined, evt));
    }

    private handleReplaceAllButtonClicked(e: MouseEvent) {
        let evt = new ReplaceEvent(this.searchInputContent, this.replaceInputContent, true);
        this._replaceEventHandlers.forEach((h: ReplaceEventHandler) => h.call(undefined, evt));
    }

    set width(w: number) {
        if (w !== this._width) {
            this._width = w;

            this._elem.style.width = w + "px";
        }
    }

    get width(): number {
        return this._width;
    }

    set display(b: boolean) {
        if (b !== this._display) {
            this._display = b;
            if (b) {
                this._elem.classList.add("active");
                // this._elem.style.display = "block";
            } else {
                this._elem.classList.remove("active");
                // this._elem.style.display = "none";
            }
        }
    }

    get display(): boolean {
        return this._display;
    }

    get searchInputContent() : string {
        return this._searchInputContent;
    }

    set searchInputContent(data: string) {
        this._searchInput.value = data;
    }

    get replaceInputContent() : string {
        return this._replaceInputContent;
    }

    set replaceInputContent(data: string) {
        this._replaceInput.value = data;
    }

    get searchInput(): HTMLInputElement {
        return this._searchInput;
    }

    get replaceInput(): HTMLInputElement {
        return this._replaceInput;
    }

    get closeButton(): HTMLElement {
        return this._closeBtn;
    }

}

export class SearchEvent {

    private _content: string;
    private _isNext: boolean;

    /**
     * @param content the content of search string
     * @param isNext find the next or find the previous
     */
    constructor(content: string, isNext: boolean = true) {
        this._content = content;
        this._isNext = isNext;
    }

    get content(): string {
        return this._content;
    }

    get isNext(): boolean {
        return this._isNext;
    }

}

export class ReplaceEvent {

    private _srcContent: string;
    private _targetContent: string;
    private _isAll: boolean;

    constructor(srcContent: string, targetContent: string, isAll: boolean) {
        this._srcContent = srcContent;
        this._targetContent = targetContent;
        this._isAll = isAll;
    }

    get sourceContent(): string {
        return this._srcContent
    }

    get targetContent(): string {
        return this._targetContent;
    }

    get isAll(): boolean {
        return this._isAll;
    }

}

interface SearchEventHandler {
    (e: SearchEvent): void;
}

interface ReplaceEventHandler {
    (e: ReplaceEvent): void;
}
