/* eslint-disable valid-jsdoc */
const fs = require('fs')
const ICONS_PATH = './public/icons/'
const data = {}

function toConsole(err) {
  return console.log(err)
}

// /**
//  * @param {string} title
//  * @param {number} id
//  */
// function init(title) {
//   this.dir = `${PUBLIC_PATH}${title}/`
//   this.title = title
//   return this
// }

try {
  const icons = fs.readdirSync(ICONS_PATH)
  icons.forEach(findIcons)
  const string = JSON.stringify(data)
  const content = 'export default ' + string
  fs.writeFile('./src/icons.js', content, (err) => {
    console.log(err)
  })
} catch (error) {
  toConsole(error)
}

// function imagesSet(path, obj) {
//   const images = fs.readdirSync(path)
//   images.forEach((image) => {
//     obj.imgPath = image
//   })
// }

function findIcons(icon) {
  try {
    const iconName = icon.replace('.svg', '')
    const iconContext = fs.readFileSync(ICONS_PATH + icon, 'utf8')
    data[iconName] = iconContext
  } catch (err) {
    console.error(err)
  }
}
