
declare module "list-diff2" {

    enum MoveType {
        Removing,
        Inserting,
    }

    interface Move<T>{
        index: number,
        type: MoveType,
        item?: T;
    }

    interface DiffResult<T> {
        moves: Move<T>[];
        children: T[];
    }

    function listDiff<T>(oldList: T[], newList: T[], key: string): DiffResult<T>;

}
