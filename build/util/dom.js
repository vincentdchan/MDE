"use strict";
var DomHelper;
(function (DomHelper) {
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
    DomHelper.elem = elem;
    class AppendableDomWrapper {
        constructor(elemName, className, props) {
            this._dom = elem(elemName, className, props);
        }
        element() {
            return this._dom;
        }
        appendTo(elem) {
            elem.appendChild(this._dom);
        }
        addEventListener(name, _fun, useCapture) {
            this._dom.addEventListener(name, _fun, useCapture);
        }
    }
    DomHelper.AppendableDomWrapper = AppendableDomWrapper;
})(DomHelper = exports.DomHelper || (exports.DomHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBaUIsU0FBUyxDQXNEekI7QUF0REQsV0FBaUIsU0FBUyxFQUFDLENBQUM7SUFFeEIsY0FBcUIsUUFBaUIsRUFBRSxTQUFrQixFQUFFLEtBQVc7UUFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQWJlLGNBQUksT0FhbkIsQ0FBQTtJQWlCRDtRQUlJLFlBQVksUUFBZ0IsRUFBRSxTQUFtQixFQUFFLEtBQVk7WUFDM0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsT0FBTztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxRQUFRLENBQUMsSUFBa0I7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUF3QyxFQUFFLFVBQW9CO1lBQ3pGLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBRUwsQ0FBQztJQXBCWSw4QkFBb0IsdUJBb0JoQyxDQUFBO0FBRUwsQ0FBQyxFQXREZ0IsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFzRHpCIiwiZmlsZSI6InV0aWwvZG9tLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
