export const extractFileNameFromPath = path => path.split('/').at(-1).split('.')[0]

export const extractFileNameFromGlobImport = demos => {
  const names = []
  for (const path in demos) names.push(extractFileNameFromPath(path))

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
