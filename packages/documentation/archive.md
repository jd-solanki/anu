# Archive
> This is just for my reference

## How to get demo code via JS

```js
import { extractFileNameFromGlobImport, renameKey } from '../../utils'
const codeGlob = import.meta.glob('../../demos/alert/*.vue', { as: 'raw' })
const fileNames = extractFileNameFromGlobImport(codeGlob)
const codesArr = Object.values(codeGlob)
const codes = Object.fromEntries(fileNames.map((_, i) => [fileNames[i], codesArr[i]]))
```
