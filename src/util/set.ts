
export function mergeSet<T>(a: Set<T>, b: Set<T>) {
    let result = new Set<T>();

    function addToResult(e : T) {
        result.add(e);
    }

    a.forEach(addToResult);
    b.forEach(addToResult);

    return result;
}
