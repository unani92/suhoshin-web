import axios from '@/modules/axios'

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
        const header = JSON.parse(window.localStorage.getItem('header'))
        axios.setHeader(header)
        commit('setHeader', header)
    },
    async loadMe({ commit }) {},
    async loadSettings({ commit }) {},
    async signIn({ commit, getters, dispatch }, payload) {},
    async signOut({ commit, getters }) {},
}

const mutations = {
    setHeader(state, header) {
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
