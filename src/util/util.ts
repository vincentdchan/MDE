

export function insertBreakAtPoint(e : MouseEvent) {

    let range = document.caretRangeFromPoint(e.pageX, e.pageY);
    let textNode = range.startContainer;
    let offset = range.startOffset;

/*
    if (document.caretPositionFromPoint) {    // standard
        range = document.caretPositionFromPoint(e.pageX, e.pageY);
        textNode = range.offsetNode;
        offset = range.offset;

    } else if (document.caretRangeFromPoint) {    // WebKit
        range = document.caretRangeFromPoint(e.pageX, e.pageY);
        textNode = range.startContainer;
        offset = range.startOffset;
    }
    */

    return offset;
}
