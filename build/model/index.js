"use strict";
var textModel_1 = require("./textModel");
exports.TextModel = textModel_1.TextModel;
var lineModel_1 = require("./lineModel");
exports.LineModel = lineModel_1.LineModel;
var lineStream_1 = require("./lineStream");
exports.LineStream = lineStream_1.LineStream;
var textEdit_1 = require("./textEdit");
exports.TextEdit = textEdit_1.TextEdit;
exports.TextEditType = textEdit_1.TextEditType;
function isPosition(obj) {
    return "line" in obj && "offset" in obj;
}
exports.isPosition = isPosition;
function isRange(obj) {
    return "begin" in obj && "end" in obj;
}
exports.isRange = isRange;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXdCLGFBQ3hCLENBQUM7QUFETywwQ0FBNkI7QUFDckMsMEJBQXdCLGFBQ3hCLENBQUM7QUFETywwQ0FBNkI7QUFDckMsMkJBQXNDLGNBQ3RDLENBQUM7QUFETyw2Q0FBNEM7QUFDcEQseUJBQXFDLFlBRXJDLENBQUM7QUFGTyx1Q0FBUTtBQUFFLCtDQUErQjtBQVlqRCxvQkFBMkIsR0FBUztJQUNoQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLElBQUksR0FBRyxDQUFDO0FBQzVDLENBQUM7QUFGZSxrQkFBVSxhQUV6QixDQUFBO0FBRUQsaUJBQXdCLEdBQVE7SUFDNUIsTUFBTSxDQUFDLE9BQU8sSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQztBQUMxQyxDQUFDO0FBRmUsZUFBTyxVQUV0QixDQUFBIiwiZmlsZSI6Im1vZGVsL2luZGV4LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
