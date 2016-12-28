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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbC9zbmlwcGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFpQixPQUFPLENBeUJ2QjtBQXpCRCxXQUFpQixPQUFPLEVBQUMsQ0FBQztJQVl0Qix1QkFBOEIsTUFBYyxFQUFFLElBQWMsRUFBRSxJQUFhO1FBQ3ZFLE1BQU0sQ0FBQztZQUNILE1BQU0sRUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUU7WUFDNUIsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO1NBQ2hDLENBQUM7SUFDTixDQUFDO0lBTmUscUJBQWEsZ0JBTTVCLENBQUE7SUFFRCxtQkFBMEIsR0FBUTtRQUM5QixNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQzdDLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxRQUFRLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUM7SUFDckUsQ0FBQztJQUhlLGlCQUFTLFlBR3hCLENBQUE7QUFFTCxDQUFDLEVBekJnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUF5QnZCIiwiZmlsZSI6Im1vZGVsL3NuaXBwZXQuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
