export type DomeNode = HTMLElement | null
export default class DOM {
  static init(selector: string | HTMLElement | null): DOM
  static create: (tagName?: keyof HTMLElementTagNameMap, ...classes: string[]) => DOM
  static get body(): DOM
  static stopScroll(): void
  static scroll(): void

  constructor(selector: string | HTMLElement | null)

  $node: DomeNode
  scroll(): void
  stopScroll(): void
  html(htmlString: string | HTMLElement): string | DOM
  delete(): DOM
  clear(): DOM
  append(element: string | Node | DomeNode | DOM, where?: InsertPosition): DOM
  on(event: keyof GlobalEventHandlersEventMap, cb: () => void): DOM
  off(event: keyof GlobalEventHandlersEventMap, cb: () => void): DOM
  getCoords(): DOMRect
  closest(selector: string): DOM
  addClass(classes: string | string[]): void
  toggle(className: string): void
  hasClass(prop: string): boolean
  removeClass(classes: string | string[]): DOM
  find(selector: string): DOM
  findAll(selector: string): DOM[]
  css(styles?: {}): DOM
  removeCss(styles?: {}): void
  clearClass(): void
  clearCss(): void
  idData(isParce: boolean): any
  getAttr(attributeName: string): string
  setAttr(attributeName: string, attributeValue: string): DOM
  removeAttr(attributeName: string): DOM
  focus(): DOM
  blur(): DOM
  value(value?: string | null): any
  get attrsData(): DOMStringMap
  get isEmpty(): boolean
}
