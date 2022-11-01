export class Table {
    static get sectionClasses(): string[];
    constructor(rootComponent: any);
    beforeInit(): void;
    selection: Selection;
    init(): void;
    toHTML(): any;
    onMousedown(event: any): void;
    onInput(event: any): void;
    onKeydown(event: any): void;
    onClick(event: any): void;
}
import { Selection } from "./Selection";
