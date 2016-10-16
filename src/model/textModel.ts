

export class TextModel {

    protected lines : string[];
    
}

export class RopeString {
    
    protected root : RopeNode = null;
    
    constructor() {
        
    }
    
    index(index : number) : string {
        return this._index(this.root, index);
    }
    
    static concat(n1 : RopeNode, n2 : RopeNode) : RopeNode {
        var new_node = new RopeNode();
        new_node.right = n1;
        new_node.left = n2;
        return new_node;
    }
    
    static split(_node : RopeNode, index : number) : RopeNode {            
        if (index < _node.weight) {

        }
    }
    
    static calculateWeight(_node : RopeNode) : number {
        if (_node.left == null && _node.right == null) {
            return _node.weight;
        }
        
        return this.calculateWeight(_node.weight);

    }
    
    static isLeave(_node : RopeNode) : boolean {
        if (_node.left == null && _node.right == null) {
            return true;
        }
        else {
            return false;
        }
    }
    
    insert(index : number, str : string) {
        var new_node = new RopeNode();
        new_node.content = str;
    }
    
    private _index(_node : RopeNode, i : number) : string {
        if (_node.weight < i) {
            return this._index(_node.right, i - _node.weight);
        } else {
            if (_node.left != null) {
                return this._index(_node.left, i);
            } else {
                return _node.content.charAt(i);
            }
        }
    }

}

export class RopeNode {
    
    protected _content : string = null;
    
    protected _left : RopeNode = null;
    protected _right : RopeNode = null;
    
    protected _weight : number;
    
    
    constructor() {
        
    }
    
    get weight() : number { return this._weight; }
    set weight(v : number) { this._weight = v; }
    
    get content() : string { return this._content; }
    set content(_con : string) { this._content = _con; }
    
    get left() : RopeNode { return this._left; }
    set left(rn : RopeNode) { this._left = rn; }
    
    get right() : RopeNode { return this._right; }
    set right(rn : RopeNode) { this._right = rn; }
    
}
