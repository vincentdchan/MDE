
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
