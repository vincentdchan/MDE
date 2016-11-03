/// <reference path="./list-diff2.d.ts" />
import {VElement} from "./vElement"
import {Difference, DiffType} from "./diff"

interface Walker {
    index: number;
}

export function patch(node: Node, patches: Map<number, Difference[]>) {
    let walker = <Walker>{index: 0};
    dfsWalk(node, walker, patches);
}

function dfsWalk(node: Node, walker: Walker, patches: Map<number, Difference[]>){
    let currentPatches = patches.get(walker.index);


    let len = node.childNodes
        ? node.childNodes.length : 0;

    for (let i = 0; i < len; i++) {
        let child = node.childNodes[i];
        walker.index++;
        dfsWalk(child, walker, patches);
    }
    
    if (currentPatches) {
        applyPatches(node, currentPatches);
    }
}

function applyPatches (node: Node, currentPatches: Difference[]) {
    currentPatches.forEach((currentPatch : Difference) => {
        switch(currentPatch.type) {
            case DiffType.REPLACE:
                let newNode = currentPatch.content?
                    document.createTextNode(currentPatch.content):
                    currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            case DiffType.REORDER:
                reorderChildren(node, currentPatch.moves);
                break;
            case DiffType.PROPS:
                setProps(node, currentPatch.props);
                break;
            case DiffType.TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error("Unkown patch type: " + currentPatch.type);
        }
    });
}

function setProps(node: Node, props: Map<string, string>) {
    let elem = <HTMLElement>node;
    props.forEach((value, key) => {
        if (value === null) {
            elem.removeAttribute(key);
        } else {
            elem.setAttribute(key, value);
        }
    });
}

function reorderChildren(node: Node, moves: listDiff.Move<VElement | string>[]) {
    let staticNodeList = [...node.childNodes];
    let maps = new Map<string, HTMLElement>();

    staticNodeList.forEach((node: Node) => {
        if (node.nodeType === 1) {
            let elem = <HTMLElement>node;
            let key = elem.getAttribute("key");
            if (key) {
                maps.set(key, elem);
            }
        }
    });

    moves.forEach((move: listDiff.Move<VElement | string>) => {
        let index = move.index;
        if (move.type === listDiff.MoveType.Removing) {
            if (staticNodeList[index] === node.childNodes[index]) {
                node.removeChild(node.childNodes[index]);
            }
            staticNodeList.splice(index, 1);
        } else if (move.type === listDiff.MoveType.Inserting) {
            let insertNode: Node;
            if (maps.get(move.item['key'])) {
                insertNode = maps.get(move.item['key'])
            } else if (move.item instanceof VElement) {
                insertNode = move.item.render();
            } else if (typeof move.item === "string") {
                insertNode = document.createTextNode(move.item);
            }
            staticNodeList.splice(index, 0, insertNode);
            node.insertBefore(insertNode, node.childNodes[index] || null);
        }
    })
}
