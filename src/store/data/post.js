import postService from '@/services/post'

const defaultState = () => ({
    free: [],
    notice: [],
    mainPosts: null,
})

const state = defaultState()

const getters = {
    free: state => state.free,
    notice: state => state.notice,
    mainPosts: state => state.mainPosts,
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
    async getMainPosts({ commit }) {
        const { data } = await postService.getPosts.getMain()
        commit('setMainPosts', data)
    },
    async refresh({ commit }) {
        const { data: free } = await postService.getPosts.all(0, 2)
        const { data: notice } = await postService.getPosts.all(0, 1)
        commit('setFreePosts', free)
        commit('setNoticePosts', notice)
    },
}

const mutations = {
    setFreePosts(state, value) {
        state.free = value
    },
    setNoticePosts(state, value) {
        state.notice = value
    },
    setMainPosts(state, value) {
        state.mainPosts = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
