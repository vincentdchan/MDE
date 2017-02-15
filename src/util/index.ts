export {StringBuffer} from "./stringBuffer"
export {mergeSet} from "./set"
export {DomWrapper} from "./domWrapper"
export {Deque} from "./queue"
export {Host} from "./host"
export {TickTockPair, TickTockUtil} from "./ticktock"
export {KeyCode} from "./keyCode"
export {ITokenizer} from "./tokenizer"
export {MarkdownTokenType, MarkdownTokenizeState, MarkdownTokenizer} from "./markdownTokenizer"
export {i18n} from "./i18n"

export interface IDisposable {
    dispose(): any;
}

export function StringFormat(src: string, ...args: string[]) : string {
    for(var i=0; i < args.length; i++) {
        let re = new RegExp('\\{' + (i) + '\\}','gm');
        src = src.replace(re, args[i]);
    }
    return src;
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
