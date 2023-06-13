import { File, type Store, type StoreState, compileFile } from '@vue/repl'
import * as defaultCompiler from 'vue/compiler-sfc'
import mainCode from '../template/main.vue?raw'
import welcomeCode from '../template/welcome.vue?raw'
import anuVueCode from '../template/anu-vue.js?raw'
import useMessage from '@/composables/useMessage'
import { atou, utoa } from '@/utils/encode'
import { genCdnLink, genImportMap, genVueLink } from '@/utils/dependency'
import { type ImportMap, mergeImportMap } from '@/utils/import-map'
import { IS_DEV } from '@/constants'

export interface Initial {
  serializedState?: string
  versions?: Versions
  userOptions?: UserOptions
  pr?: string | null
}
export type VersionKey = 'vue' | 'anuVue'
export type Versions = Record<VersionKey, string>
export interface UserOptions {
  styleSource?: string
  showHidden?: boolean
}
export type SerializeState = Record<string, string> & {
  _o?: UserOptions
}

const MAIN_FILE = 'Main.vue'
const APP_FILE = 'App.vue'
const ANU_FILE = 'anu-vue.js'
const IMPORT_MAP = 'import-map.json'
export const USER_IMPORT_MAP = 'import_map.json'

export function useStore(initial: Initial) {
  const versions = reactive(
    initial.versions || { vue: 'latest', anuVue: 'latest' },
  )

  const compiler = shallowRef<typeof import('vue/compiler-sfc')>(defaultCompiler)
  const userOptions = ref<UserOptions>(initial.userOptions || {})
  const hideFile = computed(() => !IS_DEV && !userOptions.value.showHidden)

  const files = initFiles(initial.serializedState || '')
  const state = reactive<StoreState>({
    mainFile: MAIN_FILE,
    files,
    activeFile: files[APP_FILE],
    errors: [],
    vueRuntimeURL: '',
    vueServerRendererURL: '',
    resetFlip: false,
  })

  const bultinImportMap = computed<ImportMap>(() =>
    genImportMap(versions),
  )

  const userImportMap = computed<ImportMap>(() => {
    const code = state.files[USER_IMPORT_MAP]?.code.trim()
    if (!code)
      return {}
    let map: ImportMap = {}
    try {
      map = JSON.parse(code)
    }
    catch (err) {
      console.error(err)
    }

    return map
  })

  const importMap = computed<ImportMap>(() =>
    mergeImportMap(bultinImportMap.value, userImportMap.value),
  )

  // eslint-disable-next-line no-console
  console.log('Files:', files, 'Options:', userOptions.value)

  const store: Store = reactive({
    init,
    state,
    compiler,
    setActive,
    addFile,
    deleteFile,
    getImportMap,
    initialShowOutput: false,
    initialOutputMode: 'preview',
  })

  watch(
    importMap,
    content => {
      state.files[IMPORT_MAP] = new File(
        IMPORT_MAP,
        JSON.stringify(content, undefined, 2),
        hideFile.value,
      )
    },
    { immediate: true, deep: true },
  )

  watch(
    () => versions.anuVue,
    version => {
      const file = new File(
        ANU_FILE,
        generateAnuVueCode(version, userOptions.value.styleSource).trim(),
        hideFile.value,
      )

      state.files[ANU_FILE] = file

      compileFile(store, file)
    },
    { immediate: true },
  )

  function generateAnuVueCode(version: string, styleSource?: string) {
    const style = styleSource
      ? styleSource.replace('#VERSION#', version)
      : genCdnLink('anu-vue', version, '/dist/style.css')
    const themeStyle = genCdnLink('@anu-vue/preset-theme-default', version, '/dist/style.css')
    const resetStyle = 'https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css'

    return anuVueCode.replace('#ANU_STYLE#', style)
      .replace('#ANU_THEME_STYLE#', themeStyle)
      .replace('#UNO_RESET#', resetStyle)
  }

  async function setVueVersion(version: string) {
    const { compilerSfc, runtimeDom } = genVueLink(version)

    compiler.value = await import(/* @vite-ignore */ compilerSfc)
    state.vueRuntimeURL = runtimeDom
    versions.vue = version

    // eslint-disable-next-line no-console
    console.info(`[@vue/repl] Now using Vue version: ${version}`)
  }

  async function init() {
    await setVueVersion(versions.vue)

    for (const file of Object.values(state.files))
      compileFile(store, file)

    watchEffect(() => compileFile(store, state.activeFile))
  }

  function getFiles() {
    const exported: Record<string, string> = {}
    for (const file of Object.values(state.files)) {
      if (file.hidden)
        continue
      exported[file.filename] = file.code
    }

    return exported
  }

  function serialize() {
    const state: SerializeState = { ...getFiles() }
    state._o = userOptions.value

    return utoa(JSON.stringify(state))
  }

  function deserialize(text: string): SerializeState {
    return JSON.parse(atou(text))
  }

  function initFiles(serializedState: string) {
    const files: StoreState['files'] = {}
    if (serializedState) {
      const saved = deserialize(serializedState)
      for (const [filename, file] of Object.entries(saved)) {
        if (filename === '_o')
          continue
        files[filename] = new File(filename, file as string)
      }
      userOptions.value = saved._o || {}
    }
    else {
      files[APP_FILE] = new File(APP_FILE, welcomeCode)
    }
    files[MAIN_FILE] = new File(MAIN_FILE, mainCode, hideFile.value)
    if (!files[USER_IMPORT_MAP]) {
      files[USER_IMPORT_MAP] = new File(
        USER_IMPORT_MAP,
        JSON.stringify({ imports: {} }, undefined, 2),
      )
    }

    return files
  }

  function setActive(filename: string) {
    const file = state.files[filename]
    if (file.hidden)
      return
    state.activeFile = state.files[filename]
  }

  function addFile(fileOrFilename: string | File) {
    const file
      = typeof fileOrFilename === 'string'
        ? new File(fileOrFilename)
        : fileOrFilename
    state.files[file.filename] = file
    setActive(file.filename)
  }

  async function deleteFile(filename: string) {
    if (
      [
        ANU_FILE,
        MAIN_FILE,
        APP_FILE,
        ANU_FILE,
        IMPORT_MAP,
        USER_IMPORT_MAP,
      ].includes(filename)
    ) {
      const message = useMessage()
      message({
        content: 'You cannot remove it, because Anu requires it',
        color: 'warning',
      })

      return
    }

    // todo add useDialog
    if (
      window.confirm(`Are you sure you want to delete ${filename}?`)
    ) {
      if (state.activeFile.filename === filename)
        setActive(APP_FILE)

      delete state.files[filename]
    }
  }

  function getImportMap() {
    return importMap.value
  }

  async function setVersion(key: VersionKey, version: string) {
    switch (key) {
      case 'anuVue':
        setAnuVueVersion(version)
        break
      case 'vue':
        await setVueVersion(version)
        break
    }
  }

  function setAnuVueVersion(version: string) {
    versions.anuVue = version
  }

  return {
    ...store,

    versions,
    userOptions,

    init,
    serialize,
    setVersion,
    pr: initial.pr,
  }
}

export type ReplStore = ReturnType<typeof useStore>
