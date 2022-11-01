export class ExcelComponent {
    static get rootClasses(): string[];
    constructor(rootComponent: any, options?: {});
    title: any;
    toHTML(): string;
    beforeInit(): void;
    init(): void;
    destroy(): void;
    throttle(callback: any, delay: any, options: any): (...arguments_: any[]) => void;
}
