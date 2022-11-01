export class Slider {
    static get sectionClasses(): string[];
    constructor(rootComponent: any);
    transitionDuration: number;
    activeSlide: number;
    side: number;
    sideWidth: number;
    sideHeight: any;
    click: number;
    toHTML(): string;
    onClick(event: any): void;
    nextSlide(event: any): Promise<void>;
    toSlide(event: any): Promise<void>;
    oneSlide(btn: any, slides: any, container: any, width: any): void;
}
