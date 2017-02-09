"use strict";
var Snippet;
(function (Snippet) {
    function createSnippet(prefix, body, desp) {
        return {
            prefix: prefix ? prefix : "",
            body: body,
            description: desp ? desp : "",
        };
    }
    Snippet.createSnippet = createSnippet;
    function isSnippet(obj) {
        return obj && obj.body && Array.isArray(obj.body) &&
            typeof obj.prefix == "string" && obj.description == "string";
    }
    Snippet.isSnippet = isSnippet;
})(Snippet = exports.Snippet || (exports.Snippet = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9zbmlwcGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFpQixPQUFPLENBeUJ2QjtBQXpCRCxXQUFpQixPQUFPO0lBWXBCLHVCQUE4QixNQUFjLEVBQUUsSUFBYyxFQUFFLElBQWE7UUFDdkUsTUFBTSxDQUFDO1lBQ0gsTUFBTSxFQUFFLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRTtZQUM1QixJQUFJLEVBQUUsSUFBSTtZQUNWLFdBQVcsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7U0FDaEMsQ0FBQztJQUNOLENBQUM7SUFOZSxxQkFBYSxnQkFNNUIsQ0FBQTtJQUVELG1CQUEwQixHQUFRO1FBQzlCLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDN0MsT0FBTyxHQUFHLENBQUMsTUFBTSxJQUFJLFFBQVEsSUFBSSxHQUFHLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQztJQUNyRSxDQUFDO0lBSGUsaUJBQVMsWUFHeEIsQ0FBQTtBQUVMLENBQUMsRUF6QmdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXlCdkIiLCJmaWxlIjoibW9kZWwvc25pcHBldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
