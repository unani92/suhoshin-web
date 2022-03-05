import axios from '@/modules/axios'
import userService from '@/services/user'
import router from '@/router'

// const transformLoginResponseToHeader = ({ token }) => ({
//     Authorization: `Barer ${token}`,
// })

const defaultState = () => ({
    me: null,
    profile: null,
    header: null,
})

const state = defaultState()

const getters = {
    me: state => state.me,
    settings: state => state.settings,
    header: state => state.header,
}

const actions = {
    async loadAuthToken({ commit, dispatch, getters }) {
        const header = JSON.parse(window.sessionStorage.getItem('header'))

        if (!header) {
            window.sessionStorage.removeItem('header')
            return Promise.reject({ status: 401 })
        }

        axios.setHeader(header)
        commit('setHeader', header)
    },
    async loadMe({ commit }) {
        try {
            const me = await userService.me()
            commit('setMe', me)
            if (me.is_dormant) {
                // router.push({ name: 'DormantPage' })
                return Promise.reject()
            }
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async loadSettings({ commit }) {},
    async signIn({ commit, getters, dispatch }, payload) {},
    async signOut() {
        window.sessionStorage.clear()

        if (router.currentRoute.name !== 'FrontPage') {
            router.push({ name: 'FrontPage' })
        }
    },
}

const mutations = {
    setHeader(state, header) {
        axios.setHeader(header)
        state.header = header
    },
    setMe(state, me) {
        state.me = me
    },
    setProfile(state, profile) {
        state.profile = profile
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
