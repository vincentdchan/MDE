import {VElement} from "./vElement"
import {Difference} from "./diff"

interface Walker {
    index: number;
}

export function patch(node: VElement | string, patches: Difference[]) {
    let walker = <Walker>{index: 0};
    dfsWalk(node, walker, patches);
}

function dfsWalk(node: VElement | string, walker: Walker, patches: Difference[]){
    let currentPatches = patches[walker.index];
}
