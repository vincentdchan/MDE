"use strict";
const vElement_1 = require("../virtualDOM/vElement");
class VirtualDOMGenerator {
    constructor(textModel) {
        this.root = new vElement_1.VElement("div", {
            "class": "editor-frame"
        }, []);
        this.textModel = textModel;
    }
    generate() {
        for (let i = 1; i <= this.textModel.linesCount; i++) {
            let lineElm = new vElement_1.VElement("div", {
                "class": "editor-line"
            }, []);
            let lineSpan = new vElement_1.VElement("span", null, []);
            lineElm.children.push(lineSpan);
            lineSpan.children.push(this.textModel.lineAt(i).text);
            this.root.children.push(lineElm);
        }
        return this.root;
    }
}
exports.VirtualDOMGenerator = VirtualDOMGenerator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC92aXJ0dWFsRE9NR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSwyQkFBdUIsd0JBRXZCLENBQUMsQ0FGOEM7QUFFL0M7SUFLSSxZQUFZLFNBQW9CO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEtBQUssRUFBRTtZQUM1QixPQUFPLEVBQUUsY0FBYztTQUMxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELFFBQVE7UUFDSixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEtBQUssRUFBRTtnQkFDOUIsT0FBTyxFQUFFLGFBQWE7YUFDekIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNQLElBQUksUUFBUSxHQUFHLElBQUksbUJBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztBQUVMLENBQUM7QUE1QlksMkJBQW1CLHNCQTRCL0IsQ0FBQSIsImZpbGUiOiJtb2RlbC92aXJ0dWFsRE9NR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
