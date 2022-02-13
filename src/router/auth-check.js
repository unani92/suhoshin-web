import { store as $store } from '@/store'

export default async (to, from, next) => {
    if (!$store.getters.me || !$store.getters.me.token) {
        try {
            await $store.dispatch('loadAuthToken')
            next()
        } catch (err) {
            next('/front')
        }
    } else {
        next()
    }
}
