import {IStream} from "../model"

export interface ITokenizer<StateType, TokenType> {

    startState(): StateType;
    tokenize(IStream, StateType): TokenType;
    tokenizeBlankLine?(IStream): TokenType;
    copyState?(StateType): StateType;

}
