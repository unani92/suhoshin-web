import postService from '@/services/post'
import commentsService from '@/services/comments'

const defaultState = () => ({
    awayPost: [],
    free: [],
    notice: [],
    suggest: [],
    mainPosts: null,
    currentPostComments: null,
})

const state = defaultState()

const getters = {
    awayPost: state => state.awayPost,
    free: state => state.free,
    notice: state => state.notice,
    suggest: state => state.suggest,
    mainPosts: state => state.mainPosts,
    currentPostComments: state => state.currentPostComments,
}

const actions = {
    async getSuggestPosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 4)
        commit('setSuggestPosts', [...getters.suggest, ...data])
    },
    async getSubmitAwayPosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 3)
        commit('setSubmitAwayPosts', [...getters.awayPost, ...data])
    },
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
        const { data: notice } = await postService.getPosts.all(0, 1)
        const { data: free } = await postService.getPosts.all(0, 2)
        const { data: away } = await postService.getPosts.all(0, 3)
        const { data: suggest } = await postService.getPosts.all(0, 4)
        commit('setFreePosts', free)
        commit('setNoticePosts', notice)
        commit('setSubmitAwayPosts', away)
        commit('setSuggestPosts', suggest)
    },
    async getCurrentPostComments({ commit }, postId) {
        const { data: comments } = await commentsService.comment.getAllComments(postId)
        commit('setCurrentPostComments', comments)
    },
}

const mutations = {
    setSuggestPosts(state, value) {
        state.suggest = value
    },
    setSubmitAwayPosts(state, value) {
        state.awayPost = value
    },
    setFreePosts(state, value) {
        state.free = value
    },
    setNoticePosts(state, value) {
        state.notice = value
    },
    setMainPosts(state, value) {
        state.mainPosts = value
    },
    setCurrentPostComments(state, value) {
        state.currentPostComments = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
