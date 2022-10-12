export function capitalizeFirst(event) {
  if (typeof event !== 'string') return
  return event.trim().charAt(0).toUpperCase() + event.substring(1)
}

export function setupAlphabetCodes() {
  const alphabet = {}
  for (let i = 65; i < 123; i++) {
    // console.log(`Code of letter ${String.fromCharCode(i)} is ${i}`)
    alphabet[String.fromCharCode(i)] = i
  }
  return alphabet
}
