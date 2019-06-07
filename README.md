# spreadsheet-stream

> **Semi-streaming XLS(X) / ODS / QPW ([and more](https://github.com/SheetJS/js-xlsx)) parser.**  
> "Semi" because these spreadsheet formats are not streamable so the whole thing is buffered in memory. Same as [`excel-stream`](https://github.com/dominictarr/excel-stream) but faster because there's no filesystem IO or child process.

[![npm status](http://img.shields.io/npm/v/spreadsheet-stream.svg)](https://www.npmjs.org/package/spreadsheet-stream)
[![node](https://img.shields.io/node/v/spreadsheet-stream.svg)](https://www.npmjs.org/package/spreadsheet-stream)
[![Travis build status](https://img.shields.io/travis/vweevers/spreadsheet-stream.svg?label=travis)](http://travis-ci.org/vweevers/spreadsheet-stream)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Example

```
npm i spreadsheet-stream format-data
```

```js
const sheet = require('spreadsheet-stream')
const format = require('format-data')
const fs = require('fs')

fs.createReadStream('example.xlsx')
  .pipe(sheet())
  .pipe(format('json'))
  .pipe(process.stdout)
```

NB. Although the underlying parser ([`xlsx`](https://github.com/SheetJS/js-xlsx)) also supports non-binary formats like CSV, for those formats you're better off with truly streaming solutions like [`tabular-stream`](https://github.com/vweevers/tabular-stream) (to support both spreadsheets and CSV), [`csv-parser`](https://github.com/mafintosh/csv-parser) or similar. Those are not limited by memory. For a command-line interface, see [`tabular-cli`](https://www.npmjs.com/package/tabular-cli).

## API

### `sheet([options])`

Returns a duplex stream of which the writable side takes a spreadsheet and the readable side yields row objects. Options:

- `maxSize` (number, default 0): destroy stream when more than `maxSize` bytes have been written (i.e. reject big files)
- `sheetIndex` (number, default 0): select a sheet
- `sheet` (string, default none): select a sheet by its name. Takes precedence over `sheetIndex`.

## Install

With [npm](https://npmjs.org) do:

```
npm install spreadsheet-stream
```

## License

[MIT](LICENSE.md) © 2019-present Vincent Weevers.
