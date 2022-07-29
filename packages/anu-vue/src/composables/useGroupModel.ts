import { computed, ref } from 'vue'

// type Options = string | Record<string, any>
type ComposableParams<T> = {
  multi?: boolean
} & (
  { options: T[]; count?: never }
  | { options?: never; count: number }
)

// TODO: Add xor in function params
export const useGroupModel = <T>(params: ComposableParams<T>) => {
  /*
        In:
            - options: {
                count?: number => Useful for using composable with undefined options like switches, radio, etc where no id or name is given.
                multi: boolean = false => Allow selecting multiple values
            }

        Out:
            - options => Options to render using v-for
                - trueValue => Value to set when selected
                - falseValue => Value to set when not selected
                - value => Current value/state of option
                - isSelected => If current option is selected
                - key => This will get used to get trueValue from object when object[] is passed ~or finding unique option~
            - select => Select function to select an option
            - value => modelValue

        ===

        If I pass array of string `['banana', 'apple', 'mango']` then it should return:
        ```
           [
                'banana': {
                    trueValue: 'banana',
                    falseValue: null,
                    value: 'banana',
                    isSelected: false,
                },
                ...so on
           ]
        ```

        If I pass count then it should return:
        ```
           [
                0: {
                    trueValue: true,
                    falseValue: false,
                    value: false,
                    isSelected: false,
                }
           ]
        ```

        If I pass array of objects [{ key: 'title', title: 'VueJS', color: 'green' }] then it should return:
        ```
           [
                'VueJS': {
                    trueValue: 'VueJS',
                    falseValue: null,
                    value: false,
                    isSelected: false,
                    title: 'VueJS',
                    color: 'green',
                    key: 'title',
                }
           ]
        ```

        Notes: Allow passing extra properties so it can be returned via `options`. e.g. Color

        Usage: const { options, value } = useGroupModel({ options: ['banana', 'apple', 'mango'] })
    */

  const { options, count, multi } = params

  const value = ref<T>()

  const select = (option: T) => {
    value.value = option
  }

  // TODO: Remove any
  const _options = ref(options?.map(option => {
    if (typeof option === 'string') {
      return ({
        trueValue: option,
        falseValue: null,
        value: option,
        isSelected: computed(() => option === value.value),
      })
    }

    // WIP
    return null

    // other types
  }))

  return {
    options: _options,
    value,
    select,
  }
}
