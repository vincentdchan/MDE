"use strict";
function elem(elemName, className, props) {
    let _elm = document.createElement(elemName);
    if (className)
        _elm.setAttribute("class", className);
    if (props && typeof props === "object") {
        for (let key in props) {
            _elm.setAttribute(key, props[key]);
        }
    }
    return _elm;
}
exports.elem = elem;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsY0FBcUIsUUFBaUIsRUFBRSxTQUFrQixFQUFFLEtBQVc7SUFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUUxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBYmUsWUFBSSxPQWFuQixDQUFBIiwiZmlsZSI6InV0aWwvZG9tLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
