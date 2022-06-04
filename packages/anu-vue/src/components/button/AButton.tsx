import { defineComponent } from "vue";

// const makeColorProps = () => {
//     return {
//         color: {
//             type: String,
//             validator: val => ["primary", "success", "info", "warning", "danger"].includes(val)
//         }
//     }
// }

export const AButton = defineComponent({
    name: 'AButton',
    // props: {
    //     ...makeColorProps()
    // },
    setup(props) {
        return () => <button class={['btn']}>
            Button
        </button>

    }
})