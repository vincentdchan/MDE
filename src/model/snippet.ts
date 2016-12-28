
export namespace Snippet {

    export interface ISnippetMap {
        [name: string]: ISnippet;
    }

    export interface ISnippet {
        prefix: string;
        body: string[];
        description: string;
    }

    export function createSnippet(prefix: string, body: string[], desp?: string): ISnippet {
        return {
            prefix: prefix ? prefix : "",
            body: body,
            description: desp ? desp : "",
        };
    }

    export function isSnippet(obj: any) : obj is ISnippet {
        return obj && obj.body && Array.isArray(obj.body) &&
            typeof obj.prefix == "string" && obj.description == "string";
    }

}
