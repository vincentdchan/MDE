"use strict";
function mergeSet(a, b) {
    let result = new Set();
    function addToResult(e) {
        result.add(e);
    }
    a.forEach(addToResult);
    b.forEach(addToResult);
    return result;
}
exports.mergeSet = mergeSet;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esa0JBQTRCLENBQVMsRUFBRSxDQUFTO0lBQzVDLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxFQUFLLENBQUM7SUFFMUIscUJBQXFCLENBQUs7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVhlLGdCQUFRLFdBV3ZCLENBQUEiLCJmaWxlIjoidXRpbC9zZXQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
