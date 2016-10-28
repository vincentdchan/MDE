"use strict";
function patch(node, patches) {
    let walker = { index: 0 };
    dfsWalk(node, walker, patches);
}
exports.patch = patch;
function dfsWalk(node, walker, patches) {
    let currentPatches = patches[walker.index];
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aXJ0dWFsRE9NL3BhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxlQUFzQixJQUF1QixFQUFFLE9BQXFCO0lBQ2hFLElBQUksTUFBTSxHQUFXLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQ2hDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFIZSxhQUFLLFFBR3BCLENBQUE7QUFFRCxpQkFBaUIsSUFBdUIsRUFBRSxNQUFjLEVBQUUsT0FBcUI7SUFDM0UsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDIiwiZmlsZSI6InZpcnR1YWxET00vcGF0Y2guanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
