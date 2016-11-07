import {LineModel} from "./lineModel"
import {TextModel} from "./textModel"

// The API from CodeMirror
export interface ILineStream {

    // end of line
    eol(): boolean;
    // start of line
    sol(): boolean; 

    // Returns the next character in the stream without advancing it. 
    // Will return a null at the end of the line.
    peek(): string;

    // Returns the next character in the stream and advances it. 
    // Also returns null when no more characters are available.
    next(): string;


    // match can be a character, a regular expression, 
    // or a function that takes a character and returns a boolean. 
    // If the next character in the stream 'matches' the given argument, 
    // it is consumed and returned. 
    // Otherwise, undefined is returned.
    eat(match: string | RegExp | ((char: string) => boolean)): string;

    // Repeatedly calls eat with the given argument, until it fails. 
    // Returns true if any characters were eaten.
    eatWhile(): boolean;

    // Shortcut for eatWhile when matching white-space.
    eatSpace(): boolean;

    // Moves the position to the end of the line.
    skipToEnd();

    // Skips to the next occurrence of the given character, 
    // if found on the current line 
    // (doesn't advance the stream if the character does not occur on the line). 
    // Returns true if the character was found.
    skipTo(ch: string);

    // Act like a multi-character eat—if consume is true or not given—or a look-ahead that 
    // doesn't update the stream position—if it is false. 
    // pattern can be either a string or a regular expression starting with ^. 
    // When it is a string, caseFold can be set to true to make the match case-insensitive. 
    // When successfully matching a regular expression, 
    // the returned value will be the array returned by match, 
    // in case you need to extract matched groups.
    match(pattern: string, consume?: boolean, caseFold?: boolean): boolean;
    match(pattern: RegExp, consume?: boolean): Array<string>;

    // Backs up the stream n characters. 
    // Backing it up further than the start of the current token will cause things to break, 
    // so be careful.
    backUp(n: number);  

    // Returns the column (taking into account tabs) at which the current token starts.
    column(): number; 

    // Tells you how far the current line has been indented, in spaces. 
    // Corrects for tab characters.
    indentation(): number; 

    // Get the string between the start of the current token and the current stream position.
    current(): string; 

}

class LineStream implements ILineStream {

    _model : TextModel;
    _lineModel: LineModel;
    _line : number;
    _index : number;

    constructor(_model: TextModel, _line: number) {
        this._model = _model;
        this._line = _line;
        this._lineModel = this._model.lineAt(_line);
        this._index = 0;
    }

    eol(): boolean {
        return this._index >= this._lineModel.length;
    }

    sol(): boolean {
        return this._index == 0;
    }

    peek(): string {
        let next_index = this._index + 1;
        return next_index >= this._lineModel.length? 
            null : this._lineModel.charAt(next_index);
    }

    next(): string {
        let next_index = ++this._index;
        return next_index >= this._lineModel.length? 
            null : this._lineModel.charAt(next_index);
    }

    eat(match: string | RegExp | ((char: string) => boolean)) : string {
        throw new Error("Not implmented.");
    }

    eatWhile() : boolean {
        throw new Error("Not implmented.");
    }

    eatSpace() : boolean {
        throw new Error("Not implmented.");
    }

    skipToEnd() {
        this._index = this._lineModel.length;
    }

    skipTo(ch: string) : boolean {
        throw new Error("Not implmented.");
    }

    match(pattern: string, consume?: boolean, caseFold?: boolean): boolean;
    match(pattern: RegExp, consume?: boolean): Array<string>;
    match(pattern: string | RegExp, consume?: boolean, caseFold?: boolean) : boolean | Array<string> {
        throw new Error("Not implmented.");
    }

    backUp(n : number) {
        throw new Error("Not implmented.");
    }

    column() : number {
        throw new Error("Not implmented.");
    }

    indentation() : number {
        throw new Error("Not implmented.");
    }

    current() : string {
        throw new Error("Not implmented.");
    }

}
