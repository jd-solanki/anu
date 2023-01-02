import { execSync } from 'node:child_process'
import { inc } from 'semver'
import { loadWorkspace, Package } from './utils'

async function main () {
  const workspace = await loadWorkspace(process.cwd())

  const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()
  const date = Math.round(Date.now() / (1000 * 60))

  for (const pkg of workspace.packages.filter((p: Package) => !p.data.private)) {
    const newVersion = inc(pkg.data.version, 'prerelease', 'rc')
    workspace.setVersion(pkg.data.name, `${newVersion}-${date}.${commit}`)
    const newname = pkg.data.name + '-edge'
    workspace.rename(pkg.data.name, newname)
  }
  
  await workspace.save()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
