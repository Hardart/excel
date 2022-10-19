export class Selection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current
  }

  addToGroupAndSetClass($el) {
    this.group.push($el)
    $el.addClass(Selection.className)
  }
  select($el) {
    this.cleanGroup()
    this.addToGroupAndSetClass($el)
    this.current = $el
  }

  selectGroup(arrayOf$el) {
    console.log('group')
  }

  cleanGroup() {
    this.group.forEach((el) => el.removeClass(Selection.className))
    this.group = []
  }
}
