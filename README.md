# console-ui

Composable console output:

## Installation

```
% npm install console-ui
```

## Usage

```js
import {print, paragraph, indent, listItem, text} from 'console-ui'

function loc(line, col) {
  return ['line ', text.em(line), ' column ', text.em(col)]
}

function errorHeader(filename, line, col) {
  return ['At ', text.em(filename), ' ', loc(line, col)]
}

print(
  paragraph('Errors found:'),
  listItem(
    paragraph(errorHeader('index.js', 10, 23)),
    paragraph('Cannot find module ', text.em('react'))
  )
)
```
