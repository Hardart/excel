export class Selection {
    static className: string;
    group: any[];
    addToGroupAndSetClass($el: any): void;
    select($el: any): void;
    current: any;
    selectGroup(arrayOf$el: any): void;
    cleanGroup(): void;
}
