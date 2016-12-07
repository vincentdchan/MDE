export {TextModel} from "./textModel"
export {LineModel} from "./lineModel"
export {LineStream, ILineStream} from "./lineStream"
export {TextEdit, TextEditType, TextEditApplier} from "./textEdit"

export interface Position {
    line : number;
    offset : number;
}

export interface Range {
    begin: Position;
    end: Position;
}

export function isPosition(obj : any): obj is Position {
    return "line" in obj && "offset" in obj;
}

export function isRange(obj: any): obj is Range {
    return "begin" in obj && "end" in obj;
}

export namespace PositionUtil {

    export function clonePosition(pos: Position) : Position {
        return {
            line: pos.line,
            offset: pos.offset
        };
    }

    export function equalPostion(pos1: Position, pos2: Position) {
        return pos1.line === pos2.line && pos1.offset === pos2.offset;
    }

    export function greaterPosition(pos1: Position, pos2: Position) {
        return (pos1.line > pos2.line) || 
        ((pos1.line === pos2.line) && (pos1.offset > pos2.offset));
    }

    ///
    /// if positions are equal, then return 0
    /// if position1 is greater than position2, result > 0
    /// else result < 0
    ///
    export function comparePosition(pos1: Position, pos2: Position) {
        if (pos1.line === pos2.line) {
            return pos1.offset - pos2.offset;
        } else {
            return pos1.line - pos2.line;
        }
    }

}

