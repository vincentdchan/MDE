
export class LineNumber {
    
    private _total_number : number;
    private _frame : HTMLElement;
    
    constructor(_num : number) {
        this._total_number = _num;
        
        this._frame = document.createElement("div");
    }
    
    get total_number() {
        return this._total_number;
    }
    
    set total_number(tn : number) {
        throw new Error("not implemented");
    }
    
    get frame() {
        return this._frame;
    }

}
