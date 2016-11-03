declare namespace listDiff {

    export enum MoveType {
        Removing,
        Inserting,
    }

    interface Move<T>{
        index: number,
        type: MoveType,
        item?: T;
    }

    export interface DiffResult<T> {
        moves: Move<T>[];
        children: T[];
    }

    export function listDiff<T>(oldList: T[], newList: T[], key: string): DiffResult<T>;

}

declare module "list-diff2" {

    import D = listDiff.listDiff;
    export = D;

}
