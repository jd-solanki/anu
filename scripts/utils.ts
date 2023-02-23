import { promises as fsp } from 'node:fs'

import { defu } from 'defu'
import { globby } from 'globby'
import { resolve } from 'pathe'

export const indent = (spaces: number) => ' '.repeat(spaces)

// Helper utils for loading workspace within scripts
export interface Dep {
  name: string,
  range: string,
  type: string
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type Package = ThenArg<ReturnType<typeof loadPackage>>

export async function loadPackage (dir: string) {
  const pkgPath = resolve(dir, 'package.json')
  const data = JSON.parse(await fsp.readFile(pkgPath, 'utf-8').catch(() => '{}'))
  const save = () => fsp.writeFile(pkgPath, JSON.stringify(data, null, 2) + '\n')

  const updateDeps = (reviver: (dep: Dep) => Dep | void) => {
    for (const type of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
      if (!data[type]) { continue }
      for (const e of Object.entries(data[type])) {
        const dep: Dep = { name: e[0], range: e[1] as string, type }
        delete data[type][dep.name]
        const updated = reviver(dep) || dep
        data[updated.type] = data[updated.type] || {}
        data[updated.type][updated.name] = updated.range
      }
    }
  }

  return {
    dir,
    data,
    save,
    updateDeps
  }
}

interface LoadWorkspaceOpts {
  globbyOpts: {
    /**
     * Pattern(s) to match files against.
     * 
     * @default "packages/*"
     */
    pkgDirs: string | string[]
  }
}

export async function loadWorkspace (dir: string, options?: LoadWorkspaceOpts) {
  const { globbyOpts } = defu(options || {}, {
    globbyOpts: {
      pkgDirs: ['packages/*']
    }
  })

  const workspacePkg = await loadPackage(dir)
  const pkgDirs = (await globby(globbyOpts.pkgDirs, { onlyDirectories: true })).sort()

  const packages: Package[] = []

  for (const pkgDir of pkgDirs) {
    const pkg = await loadPackage(pkgDir)
    if (!pkg.data.name) { continue }
    packages.push(pkg)
  }

  const find = (name: string) => {
    const pkg = packages.find(pkg => pkg.data.name === name)
    if (!pkg) {
      throw new Error('Workspace package not found: ' + name)
    }
    return pkg
  }

  const rename = (from: string, to: string) => {
    find(from).data._name = find(from).data.name
    find(from).data.name = to
    for (const pkg of packages) {
      pkg.updateDeps((dep) => {
        if (dep.name === from && !dep.range.startsWith('npm:')) {
          dep.range = 'npm:' + to + '@' + dep.range
        }
      })
    }
  }

  const setVersion = (name: string, newVersion: string) => {
    find(name).data.version = newVersion
    for (const pkg of packages) {
      pkg.updateDeps((dep) => {
        if (dep.name === name) {
          dep.range = newVersion
        }
      })
    }
  }

  const save = () => Promise.all(packages.map(pkg => pkg.save()))

  return {
    dir,
    workspacePkg,
    packages,
    save,
    find,
    rename,
    setVersion
  }
}
