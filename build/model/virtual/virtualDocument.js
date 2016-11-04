"use strict";
const dom_1 = require("../../util/dom");
class VirtualDocument {
    constructor() {
        this._lines = [];
    }
    render() {
        let frame = dom_1.elem("div", "editor-document");
        this._lines.forEach((li) => {
            frame.appendChild(li.render());
        });
        return frame;
    }
    get lines() {
        return this._lines;
    }
}
exports.VirtualDocument = VirtualDocument;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsL3ZpcnR1YWxEb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsc0JBQW1CLGdCQUVuQixDQUFDLENBRmtDO0FBRW5DO0lBSUk7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksS0FBSyxHQUFHLFVBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQWU7WUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7QUFFTCxDQUFDO0FBcEJZLHVCQUFlLGtCQW9CM0IsQ0FBQSIsImZpbGUiOiJtb2RlbC92aXJ0dWFsL3ZpcnR1YWxEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
