/*
*   Follow : https://github.com/livoras/blog/issues/13
*/
/// <reference path="./list-diff2.d.ts" />
import {VElement} from "./vElement"
import listDiff = require("list-diff2")


export enum DiffType {
    REPLACE,
    REORDER,
    PROPS,
    TEXT,
}

export interface Difference {
    type: DiffType;
    node?: VElement;
    props?: Map<string, string>;
    content?: string;
    moves?: listDiff.Move<VElement | string>[];
}

export function diff(oldTree : VElement, newTree : VElement) : Map<number, Difference[]> {
    let index = 0;
    let patches: Map<number, Difference[]> = new Map<number, Difference[]>();
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

function dfsWalk(oldNode: VElement | string, newNode: VElement | string, 
    index: number, patches: Map<number, Difference[]>) {

    let currentPatch: Difference[] = [];

    // patches[index] = new Array<Difference>();
    if (newNode === null) {

    } else if (typeof oldNode == "string" && typeof newNode == "string") {
        if (newNode !== oldNode) {
            currentPatch.push({
                type: DiffType.TEXT,
                content: newNode,
            })
        }
    }
    else if ((oldNode instanceof VElement && newNode instanceof VElement) && 
        oldNode.tagName === newNode.tagName) {

        let propsPatches: Map<string, string> = diffProps(oldNode, newNode);

        if (propsPatches !== null)
            if (Object.keys(propsPatches).length > 0)
                currentPatch.push(<Difference>{
                    type: DiffType.PROPS,
                    props: propsPatches,
                });

        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);

    } else {
        patches.get(index).push(<Difference>{
            type: DiffType.REPLACE,
            node: newNode,
        })
    }

    if (currentPatch.length > 0)
        patches.set(index, currentPatch);
}

function diffChildren(oldChildren: Array<VElement | string>, newChildren: Array<VElement | string>, 
    index: number, patches: Map<number, Difference[]>, currentPatch: Difference[]) {
    let diffs = listDiff(oldChildren, newChildren, "key");
    newChildren = diffs.children;

    if (diffs.moves.length > 0) {
        let reorderPatch = <Difference> {
            type: DiffType.REORDER,
            moves: diffs.moves
        }
        currentPatch.push(reorderPatch);
    }

    let leftNode = null;
    let currentNodeIndex = index;

    oldChildren.forEach((child: VElement | string, i: number) => {
        let newChild = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
        dfsWalk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });

}

function diffProps(oldNode: VElement, newNode: VElement) {
    let count = 0;    
    let oldProps = oldNode.props;
    let newProps = newNode.props;

    let key: string, value: string;
    let propsPatches : Map<string, string> = new Map<string, string>();
    
    // find out different properties
    oldProps.forEach((value, key) => {
        if (newProps.get(key) !== value) {
            count++;
            propsPatches.set(key, newProps.get(key));
        }
    });

    newProps.forEach((value,key) => {
        if (!oldProps.has(key)) {
            count++;
            propsPatches.set(key, newProps.get(key));
        }
    })

    if (count === 0)
        return null;

    return propsPatches;
}
