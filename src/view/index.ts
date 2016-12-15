export {DocumentView} from "./viewDocument"
export {LineView} from "./viewLine"
export {WordView} from "./viewWord"
export {CursorView} from "./viewCursor"
export {EditorView} from "./viewEditor"
export {InputerView} from "./viewInputer"
export {LeftPanelView} from "./viewLeftPanel"
export {WindowView} from "./viewWindow"

export interface IHidable {
    hide();
    show();
    isHidden(): boolean;
}

export interface IVirtualNode {
    render(): Node;
}

export interface IVirtualElement {
    render(): HTMLElement;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface ButtonOption {
    name: string;
    text?: string;
    icon?: string;
    spanClass?: string;
    onClick?: (e : MouseEvent) => void;
    onHover?: (e : MouseEvent) => void;
}

export enum HighlightingType {
    Bold, Underline, Italic
}

export interface HighlightingRange {
    begin : number;
    end: number;
    types: Set<HighlightingType>;
}
