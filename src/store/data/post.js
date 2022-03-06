import postService from '@/services/post'

const defaultState = () => ({
    free: [],
    notice: [],
})

const state = defaultState()

const getters = {
    free: state => state.free,
    notice: state => state.notice,
}

const actions = {
    async getFreePosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 2)
        commit('setFreePosts', [...getters.free, ...data])
    },
    async getNoticePosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 1)
        commit('setNoticePosts', [...getters.notice, ...data])
    },
}

const mutations = {
    setFreePosts(state, value) {
        state.free = value
    },
    setNoticePosts(state, value) {
        state.notice = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
