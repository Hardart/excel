/* eslint-disable valid-jsdoc */
const fs = require('fs')
const PUBLIC_PATH = './public/'
const data = {}

function toConsole(err) {
  return console.log(err)
}

function isDirectory(stat) {
  console.log(stat)
  return stat.isDirectory()
}

/**
 * @param {string} title
 * @param {number} id
 */
function init(title) {
  this.dir = `${PUBLIC_PATH}${title}/`
  this.title = title
  return this
}

try {
  const files = fs.readdirSync(PUBLIC_PATH)
  files.forEach((file) => {
    if (file == '.DS_Store') return
    const part = {
      title: '',
      dir: null,
      images: [],
      /**
       * @param {string} imgName
       */
      set imgPath(imgName) {
        const path = `${this.title}/${imgName}`
        this.images.push(path)
      },
    }
    const obj = init.call(part, file)
    const path = obj.dir
    let isStat
    try {
      isStat = fs.lstatSync(path).isDirectory()
    } catch (error) {
      isStat = false
    }
    if (isStat) {
      imagesSet(path, obj)
    }
    data[file] = obj
  })
  const json = JSON.stringify(data)
  fs.writeFile('./src/data.json', json, 'utf8', (err) => {
    if (err) return toConsole
  })
} catch (error) {
  toConsole(error)
}

function imagesSet(path, obj) {
  const images = fs.readdirSync(path)
  images.forEach((image) => {
    obj.imgPath = image
  })
}
