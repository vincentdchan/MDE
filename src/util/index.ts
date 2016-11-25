export {ImmutableArray} from "./immutable/array"
export {StringBuffer} from "./stringBuffer"
export {mergeSet} from "./set"

export interface IDisposable {
    dispose(): any;
}

export function insertBreakAtPoint(e : MouseEvent) {

    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;

    return offset;
}
