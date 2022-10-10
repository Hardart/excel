export class DOMListener {
  constructor($rootComponent, listeners = []) {
    if (!$rootComponent) throw new Error('No root component passed')
    this.$rootComponent = $rootComponent
    this.listeners = listeners
  }

  initListeners() {}
  removeListeners() {}
}
