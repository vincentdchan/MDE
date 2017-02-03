
export class SearchBox {

    private static _onlyOne: SearchBox = null;

    public static GetOne() {
        if (SearchBox._onlyOne === null) {
            SearchBox._onlyOne = new SearchBox();
        }
        return SearchBox._onlyOne;
    }

    private _width: number;
    private _display: boolean;

    private _elem: HTMLElement;
    private _closeBtn: HTMLElement;
    private _searchInput: HTMLInputElement;
    private _replaceInput: HTMLInputElement;
    private _replaceButton: HTMLButtonElement;
    private _replaceAllButton: HTMLButtonElement;

    private _searchInputContent: string;
    private _replaceInputContent: string;

    private constructor() {
        this._elem = document.getElementById("searchbox");

        this._closeBtn = <HTMLElement>this._elem.getElementsByClassName("searchbox-titlebar-btn")[0];

        this._searchInput = <HTMLInputElement>this._elem.getElementsByTagName("input")[0];
        this._replaceInput = <HTMLInputElement>this._elem.getElementsByTagName("input")[1];

        this._replaceButton = <HTMLButtonElement>this._elem.getElementsByTagName("button")[0];
        this._replaceAllButton = <HTMLButtonElement>this._elem.getElementsByTagName("button")[1];

        this._closeBtn.addEventListener("click", (e: MouseEvent) => this.handleClose(e));
        this._searchInput.addEventListener("input", (e: Event) => this.handleSearchInputChanged(e));
        this._replaceInput.addEventListener("input", (e: Event) => this.handleReplaceInputChanged(e));
        this._replaceButton.addEventListener("click", (e: MouseEvent) => this.handleReplaceButtonClicked(e));
        this._replaceAllButton.addEventListener("click", (e: MouseEvent) => this.handleReplaceAllButtonClicked(e));

        this.display = true;
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

    private handleReplaceButtonClicked(e: MouseEvent) {

    }

    private handleReplaceAllButtonClicked(e: MouseEvent) {

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

    get replaceInputContent() : string {
        return this._replaceInputContent;
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
