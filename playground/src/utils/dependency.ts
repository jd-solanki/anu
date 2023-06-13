import { compare } from 'compare-versions'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Versions } from '@/composables/store'
import type { ImportMap } from '@/utils/import-map'

export interface Dependency {
  pkg?: string
  version?: string
  path: string
}

export type Cdn = 'unpkg' | 'jsdelivr' | 'jsdelivr-fastly'
export const cdn = useLocalStorage<Cdn>('setting-cdn', 'jsdelivr-fastly')

export function genCdnLink(pkg: string,
  version: string | undefined,
  path: string) {
  version = version ? `@${version}` : ''
  switch (cdn.value) {
    case 'jsdelivr':
      return `https://cdn.jsdelivr.net/npm/${pkg}${version}${path}`
    case 'jsdelivr-fastly':
      return `https://fastly.jsdelivr.net/npm/${pkg}${version}${path}`
    case 'unpkg':
      return `https://unpkg.com/${pkg}${version}${path}`
  }
}

export function genVueLink(version: string) {
  const compilerSfc = genCdnLink(
    '@vue/compiler-sfc',
    version,
    '/dist/compiler-sfc.esm-browser.js',
  )
  const runtimeDom = genCdnLink(
    '@vue/runtime-dom',
    version,
    '/dist/runtime-dom.esm-browser.js',
  )

  return {
    compilerSfc,
    runtimeDom,
  }
}

// TODO support more cdn delivers
export function genImportMap({ vue, anuVue }: Partial<Versions> = {}): ImportMap {
  const deps: Record<string, Dependency> = {
    'vue': {
      pkg: '@vue/runtime-dom',
      version: vue,
      path: '/dist/runtime-dom.esm-browser.js',
    },
    '@vue/shared': {
      version: vue,
      path: '/dist/shared.esm-bundler.js',
    },
    'anu-vue': {
      pkg: 'anu-vue',
      version: anuVue,
      path: '/dist/anu-vue.js',
    },
    '@anu-vue/preset-theme-default': {
      pkg: '@anu-vue/preset-theme-default',
      path: '/+esm',
    },
    '@unocss/preset-icons': {
      pkg: '@unocss/preset-icons',
      path: '/+esm',
    },
    '@unocss/preset-uno': {
      pkg: '@unocss/preset-uno',
      path: '/+esm',
    },
    'defu': {
      pkg: 'defu',
      path: '/dist/defu.mjs',
    },
    'colord': {
      pkg: 'colord',
      path: '/+esm',
    },
    '@floating-ui/vue': {
      pkg: '@floating-ui',
      path: '/vue/+esm',
    },
  }

  return {
    imports: Object.fromEntries(
      Object.entries(deps).map(([key, dep]) => [
        key,
        genCdnLink(dep.pkg ?? key, dep.version, dep.path),
      ]),
    ),
  }
}

export function getVersions(pkg: MaybeRef<string>) {
  const url = computed(
    () => `https://data.jsdelivr.com/v1/package/npm/${unref(pkg)}`,
  )
  const { data } = useFetch<string []>(url.value, {
    initialData: [],
    afterFetch: ctx => ((ctx.data = ctx.data.versions), ctx),
    refetch: true,
  }).json()

  return data as unknown as Ref<string []>
}

export function getSupportedVueVersions() {
  const versions = ref(getVersions('vue'))

  return computed(() =>
    versions.value
      .filter(version => compare(version, '3.2.0', '>='))
      .map(version => ({ text: version, value: version })),
  )
}

export function getSupportedAnuVersions() {
  const versions = ref(getVersions('anu-vue'))

  return computed(() => {
    return versions.value
      .filter(version => compare(version, '0.13.0', '>='))
      .map(version => ({ text: version, value: version }))
  })
}
