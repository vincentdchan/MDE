
export class RopeString {
    
    protected root : RopeNode = null;
    
    constructor(something : any) {
        if (something instanceof RopeNode) {
            this.root = something;
        } else if (typeof something == "string") {
            var content = <string>something;
            var new_node = new RopeNode();
            
            new_node.content = content;
            new_node.weight = content.length;
            
            this.root = new RopeNode();
            this.root.left = new_node;
            this.root.weight = new_node.weight;
        }
    }
    
    index(index : number) : string {
        return this._index(this.root, index);
    }
    
    insert(index : number, str : string) {            
        var left = RopeNode.split(this.root, index);
        var new_node = new RopeNode()
        new_node.content = str;
        new_node.weight = str.length;
        this.root = RopeNode.concat(RopeNode.concat(this.root, new_node), left)
    }
    
    delete(begin : number, end : number) {
        this.root = RopeNode.delete(this.root, begin, end);
    }
    
    report(begin : number, end : number) : string {
        return "string";
    }
    
    reportAll() : string {
        // pre-ordered iterate
        
        var nodes = new Array<RopeNode>();
        nodes.push(this.root);
        
        var buffers = new Array<string>();
        
        while (nodes.length != 0) {                
            var node = nodes.pop();
            if (node.left == null && node.right == null) {
                buffers.push(node.content);
            } else {
                
                if (node.right != null) {
                    nodes.push(node.right);
                }

                if (node.left != null) {
                    nodes.push(node.left);
                }

            }
        }

        return buffers.join("");
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

export function * RopeStringIterator() : IterableIterator<string> {
    yield "Hello"    
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

    static concat(n1 : RopeNode, n2 : RopeNode) : RopeNode {
        var new_node = new RopeNode();
        new_node.left = n1;
        new_node.right = n2;
        new_node.weight = RopeNode.sumOfLeaf(new_node.left);
        return new_node;
    }
    
    static split(_node : RopeNode, index : number) : RopeNode {            
        // if _node is leaf
        if (_node.left === null && _node.right === null) {
            var _left = _node.content.slice(0, index);
            var _right = _node.content.slice(index);
            
            _node.content = _left;
            _node.weight = _left.length;
            
            var _new_node = new RopeNode();
            _new_node.content = _right;
            _new_node.weight = _right.length;
            
            return _new_node;
        } else if (index <= _node.weight) {                
            var new_node = new RopeNode();
            new_node.right = _node.right;
            
            new_node.left = this.split(_node.left, index);
            new_node.weight = RopeNode.sumOfLeaf(new_node.left);

            _node.weight = RopeNode.sumOfLeaf(_node.left);
            
            _node.right = null;
            return new_node;
        } else {
            if (_node.right === null) {
                throw new Error("index out of range");
            }
            return this.split(_node.right, index - _node.weight);
        }
    }
    
    static delete(_node : RopeNode , begin : number, end : number) : RopeNode {
        var middle = this.split(_node, begin);
        var left = this.split(middle, end - begin);
        return this.concat(_node, left);
    }
    
    static sumOfLeaf(_node : RopeNode) : number {            
        if (_node.left === null && _node.right === null) {
            return _node.weight;
        }

        var sum = 0;

        if (_node.left !== null) {
            sum += RopeNode.sumOfLeaf(_node.left);
        }

        if (_node.right !== null) {
            sum += RopeNode.sumOfLeaf(_node.right);
        }
        
        return sum;
    }
    
}
