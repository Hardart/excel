export class Toolbar {
    static get sectionClasses(): string[];
    constructor(rootComponent: any);
    toHTML(): string;
    onClick(event: any): void;
}
