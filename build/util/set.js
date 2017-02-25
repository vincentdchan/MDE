"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtCQUE0QixDQUFTLEVBQUUsQ0FBUztJQUM1QyxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBSyxDQUFDO0lBRTFCLHFCQUFxQixDQUFLO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV2QixNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFYRCw0QkFXQyIsImZpbGUiOiJ1dGlsL3NldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
