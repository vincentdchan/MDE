"use strict";
const vElement_1 = require("./vElement");
(function (DiffType) {
    DiffType[DiffType["REPLACE"] = 0] = "REPLACE";
    DiffType[DiffType["REORDER"] = 1] = "REORDER";
    DiffType[DiffType["PROPS"] = 2] = "PROPS";
    DiffType[DiffType["TEXT"] = 3] = "TEXT";
})(exports.DiffType || (exports.DiffType = {}));
var DiffType = exports.DiffType;
function diff(oldTree, newTree) {
    let index = 0;
    let patches = new Map();
    dfsWalk(oldTree, newTree, index, patches);
    return patches;
}
exports.diff = diff;
function dfsWalk(oldNode, newNode, index, patches) {
    patches[index] = new Array();
    if (typeof newNode == "string")
        patches[index].push({
            type: DiffType.TEXT,
            content: newNode
        });
    else if (typeof oldNode == "string" && newNode instanceof vElement_1.VElement) {
        patches[index].push({
            type: DiffType.REPLACE,
            node: newNode,
        });
    }
    else if (oldNode instanceof vElement_1.VElement && newNode instanceof vElement_1.VElement) {
        if (oldNode.tagName == newNode.tagName) {
            let diffProps = new Map();
            for (let propName in oldNode.props) {
                if (newNode.props[propName] !== undefined)
                    if (oldNode.props[propName] != newNode.props[propName])
                        diffProps[propName] = newNode.props[propName];
                    else
                        diffProps[propName] = undefined;
            }
            if (Object.keys(diffProps).length > 0) {
                patches[index].push({
                    type: DiffType.PROPS,
                    props: diffProps
                });
            }
        }
        else {
            patches[index].push({
                type: DiffType.REPLACE,
                node: newNode,
            });
        }
    }
    if (oldNode instanceof vElement_1.VElement && newNode instanceof vElement_1.VElement)
        diffChildren(oldNode.children, newNode.children, index, patches);
}
exports.dfsWalk = dfsWalk;
function diffChildren(oldChildren, newChildren, index, patches) {
    let leftNode = null;
    let currentNodeIndex = index;
    oldChildren.forEach((child, i) => {
        let newChild = newChildren[i];
        currentNodeIndex = (leftNode && leftNode.count)
            ? currentNodeIndex + leftNode.count + 1
            : currentNodeIndex + 1;
        dfsWalk(child, newChild, currentNodeIndex, patches);
        leftNode = child;
    });
}
exports.diffChildren = diffChildren;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aXJ0dWFsRE9NL2RpZmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLDJCQUF1QixZQUV2QixDQUFDLENBRmtDO0FBRW5DLFdBQVksUUFBUTtJQUNoQiw2Q0FBTyxDQUFBO0lBQ1AsNkNBQU8sQ0FBQTtJQUNQLHlDQUFLLENBQUE7SUFDTCx1Q0FBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxXLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFMRCxJQUFZLFFBQVEsR0FBUixnQkFLWCxDQUFBO0FBU0QsY0FBcUIsT0FBa0IsRUFBRSxPQUFrQjtJQUN2RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLE9BQU8sR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFDekUsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUxlLFlBQUksT0FLbkIsQ0FBQTtBQUVELGlCQUF3QixPQUEwQixFQUFFLE9BQTBCLEVBQzFFLEtBQWEsRUFBRSxPQUFrQztJQUVqRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztJQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sSUFBSSxRQUFRLENBQUM7UUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBYTtZQUM1QixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQyxDQUFBO0lBQ04sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxPQUFPLFlBQVksbUJBQVEsQ0FBQyxDQUFDLENBQUM7UUFDakUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBYTtZQUM1QixJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDdEIsSUFB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
