import Vue from 'vue'
import { store as $store } from '@/store'

const initModal = (options, component) =>
    new Promise(resolve => {
        $store.commit('addModal', { component, options, resolve })
    })

export const Modal = {
    install(Vue) {
        Vue.prototype.$modal = {
            basic: options => initModal(options, 'ModalBasic'),
            custom: ({ options, component }) => initModal(options, component),
        }
    },
}

Vue.use(Modal)
