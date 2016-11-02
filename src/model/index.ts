
export interface Position {
    line : number;
    offset : number;
}

export interface Range {
    begin: Position;
    end: Position;
}
