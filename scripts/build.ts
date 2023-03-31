import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { copyFileSync } from 'fs-extra'
import { anuVuePkgRoot, repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm --filter anu-vue build', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm -r --filter=!anu-vue --filter=@anu-vue/preset-* --filter=./packages/* build', { stdio: 'inherit', cwd: repoRoot })

// copy README.md file to dist dir for npm publish
copyFileSync(
  path.join(repoRoot, 'README.md'),
  path.join(anuVuePkgRoot, 'dist', 'README.md'),
)

consola.success('Build complete!')
