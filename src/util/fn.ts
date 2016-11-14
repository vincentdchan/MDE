
export function hd<T>(arr: T[]): T {
    return arr[0];
}

export function tl<T>(arr: T[]): T[] {
    return arr.slice(1);
}

export function last<T>(arr: T[]): T {
    return arr[arr.length - 1];
}
