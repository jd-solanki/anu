export const extractFileNameFromPath = (path: string) => (path.split('/').at(-1) as string).split('.')[0]

export function extractFileNameFromGlobImport(demos: string[]): string[] {
  const names = []
  for (const path in demos) {
    const extractedName = extractFileNameFromPath(path)

    if (!extractedName)
      throw new Error(`Could not extract name from path: ${path}`)

    names.push(extractedName)
  }

  return names
}

// export const kebabCase = string => string
//   .replace(/([a-z])([A-Z])/g, '$1-$2')
//   .replace(/[\s_]+/g, '-')
//   .toLowerCase()

// export const renameKey = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
//   [newProp]: old,
//   ...others,
// })
