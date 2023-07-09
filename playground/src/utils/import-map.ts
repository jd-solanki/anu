export interface ImportMap {
  imports?: Record<string, string>
  scopes?: Record<string, string>
}

export function mergeImportMap(a: ImportMap, b: ImportMap): ImportMap {
  return {
    imports: {
      ...(a.imports || {}),
      ...(b.imports || {}),
    },
    scopes: {
      ...(a.scopes || {}),
      ...(b.scopes || {}),
    },
  }
}
