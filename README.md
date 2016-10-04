# console-ui

Composable console output:

## Installation

```
% npm install console-ui
```

## Usage

```js
import {print, paragraph, indent, listItem, text} from 'console-ui'

let em = text.white.bold

let error = text.red

function loc(line, col) {
  return ['line ', em(line), ' column ', em(col)]
}

function errorHeader(filename, line, col) {
  return ['At ', em(filename), ' ', loc(line, col)]
}

print(
  paragraph(errror('Errors found:')),
  listItem(
    paragraph(errorHeader('index.js', 10, 23)),
    paragraph('Cannot find module ', em('react'))
  )
)
```

Output:

![output][output]

[output]: test.png
