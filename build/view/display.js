"use strict";
const virtualDOMGenerator_1 = require("../model/virtualDOMGenerator");
function Display(textModel) {
    let gen = new virtualDOMGenerator_1.VirtualDOMGenerator(textModel);
    let vdom = gen.generate();
    let realDOM = vdom.render();
    document.body.appendChild(realDOM);
}
exports.Display = Display;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L2Rpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLHNDQUFrQyw4QkFFbEMsQ0FBQyxDQUYrRDtBQUVoRSxpQkFBd0IsU0FBb0I7SUFFeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSx5Q0FBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZDLENBQUM7QUFUZSxlQUFPLFVBU3RCLENBQUEiLCJmaWxlIjoidmlldy9kaXNwbGF5LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
