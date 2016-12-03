export {StringBuffer} from "./stringBuffer"
export {mergeSet} from "./set"
export {DomHelper} from "./dom"
export {Deque} from "./queue"

export interface IDisposable {
    dispose(): any;
}

export interface Vector2 {
    x: number;
    y: number;
}

export function insertBreakAtPoint(e : MouseEvent) {

    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;

    return offset;
}

export namespace ClassHelper {

    export function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

}
