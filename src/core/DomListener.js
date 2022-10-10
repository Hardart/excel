export class DOMListener {
  constructor($rootComponent) {
    if (!$rootComponent) throw new Error('No $root_component')
    this.$rootComponent = $rootComponent
  }
}
