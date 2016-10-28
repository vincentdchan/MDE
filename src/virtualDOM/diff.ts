/*
*   Follow : https://github.com/livoras/blog/issues/13
*/
import {VElement} from "./vElement"

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
}

export function diff(oldTree : VElement, newTree : VElement) : Map<number, Difference[]> {
    let index = 0;
    let patches: Map<number, Difference[]> = new Map<number, Difference[]>();
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}

export function dfsWalk(oldNode: VElement | string, newNode: VElement | string, 
    index: number, patches: Map<number, Difference[]>) {

    patches[index] = new Array<Difference>();
    if (typeof newNode == "string")
        patches[index].push(<Difference>{
            type: DiffType.TEXT,
            content: newNode
        })
    else if (typeof oldNode == "string" && newNode instanceof VElement) {
        patches[index].push(<Difference>{
            type: DiffType.REPLACE,
            node: newNode,
        })
    } else if (oldNode instanceof VElement && newNode instanceof VElement) {
        if (oldNode.tagName == newNode.tagName) { // same node
            let diffProps = new Map<string, string>();

            for (let propName in oldNode.props) {
                if (newNode.props[propName] !== undefined) 
                    if (oldNode.props[propName] != newNode.props[propName])
                        diffProps[propName] = newNode.props[propName];
                else
                    diffProps[propName] = undefined;
            }

            if (Object.keys(diffProps).length > 0) {
                patches[index].push(<Difference> {
                    type: DiffType.PROPS,
                    props: diffProps
                });
            }
        } else {
            patches[index].push(<Difference>{
                type: DiffType.REPLACE,
                node: newNode,
            })
        }

    }

    if (oldNode instanceof VElement && newNode instanceof VElement)
        diffChildren(oldNode.children, newNode.children, index, patches);
}

export function diffChildren(oldChildren: Array<VElement | string>, newChildren: Array<VElement | string>, 
    index: number, patches: Map<number, Difference[]>) {

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
