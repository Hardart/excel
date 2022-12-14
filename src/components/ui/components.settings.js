function keyToMethod(options) {
  Object.entries(options).forEach(([key, value]) => {
    this[key] = value
  })
}

function initOptions(options, defaultOptions) {
  const keys = Object.keys(defaultOptions)
  return function (option, i) {
    const key = keys[i]
    options[key] = option
  }
}

export function initArgs(defaultOptions, args) {
  if (typeof args[0] == 'object') return keyToMethod.call(this, { ...defaultOptions, ...args[0] })
  const options = {}
  args.forEach(initOptions(options, defaultOptions))
  keyToMethod.call(this, { ...defaultOptions, ...options })
}
