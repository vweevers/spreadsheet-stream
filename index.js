'use strict'

const xlsx = require('xlsx')
const duplexify = require('duplexify')
const Writable = require('readable-stream').Writable

module.exports = function (options) {
  options = options || {}

  const chunks = []
  const maxSize = options.maxSize || 0

  let size = 0

  const duplex = duplexify.obj(new Writable({
    write (chunk, enc, next) {
      size += Buffer.byteLength(chunk)

      if (maxSize > 0 && size > maxSize) {
        return next(new Error('Maximum size exceeded: ' + maxSize))
      }

      chunks.push(chunk)
      next()
    },
    final (callback) {
      const buf = Buffer.concat(chunks, size)
      let workbook

      try {
        workbook = xlsx.read(buf, { type: 'buffer' })
      } catch (err) {
        return callback(err)
      }

      const name = options.sheet || workbook.SheetNames[options.sheetIndex || 0]
      const sheet = workbook.Sheets[name]

      if (!sheet) {
        return callback(new Error('Sheet not found'))
      }

      duplex.setReadable(xlsx.stream.to_json(sheet, { raw: true, defval: null }))
      callback()
    }
  }))

  return duplex
}
