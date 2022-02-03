'use strict'

const test = require('tape')
const concat = require('concat-stream')
const sheet = require('.')

test('basic', function (t) {
  t.plan(1)

  const stream = sheet()

  stream.pipe(concat(function (data) {
    t.same(data, [{ a: 0.3, b: null, c: -2 }, { a: 'a', b: 'b', c: 'c' }])
  }))

  // Same test as excel-stream
  stream.end('a,b,c\n0.3,,-2\na,b,c')
})

test('only headers', function (t) {
  t.plan(1)

  const stream = sheet()

  stream.pipe(concat(function (data) {
    t.same(data, [])
  }))

  stream.end('beep,boop')
})

test('empty', function (t) {
  t.plan(1)

  const stream = sheet()

  stream.pipe(concat(function (data) {
    t.same(data, [])
  }))

  stream.end()
})

test('maxSize', function (t) {
  t.plan(1)

  const stream = sheet({ maxSize: 1 })

  stream.on('error', function (err) {
    t.is(err.message, 'Maximum size exceeded: 1')
  })

  stream.end('xyz')
})

test('non existent sheet', function (t) {
  t.plan(1)

  const stream = sheet({ sheet: 'no' })

  stream.on('error', function (err) {
    t.is(err.message, 'Sheet not found')
  })

  stream.end('xyz')
})

test('non existent sheetIndex', function (t) {
  t.plan(1)

  const stream = sheet({ sheetIndex: 2 })

  stream.on('error', function (err) {
    t.is(err.message, 'Sheet not found')
  })

  stream.end('xyz')
})
