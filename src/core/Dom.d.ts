export default class DOM {
  static init(selector: string): DOM
  static create: (tagName?: string, ...classes: string[]) => DOM
  constructor(selector: any)
  $node: HTMLElement
  html(htmlString: any): any
  clear(): DOM
  append(element: any): DOM
  on(event: keyof GlobalEventHandlersEventMap, cb: () => void): DOM
  off(event: keyof GlobalEventHandlersEventMap, cb: () => void): DOM
  getCoords(): DOMRect
  closest(selector: string): DOM
  addClass(classes?: string): void
  hasClass(prop?: string): any
  removeClass(classes?: string): DOM
  find(selector: string): DOM
  findAll(selector: string): DOM[]
  findPrev(): DOM
  css(styles?: CSSStyleDeclaration): DOM
  removeCss(styles?: {}): void
  idData(isParce: boolean): any
  get attrsData(): any
  getAttr(attributeName: string): any
}
