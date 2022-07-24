import postService from '@/services/post'
import commentsService from '@/services/comments'

const defaultState = () => ({
    awayPost: [],
    free: [],
    notice: [],
    suggest: [],
    materialPost: [],
    bannerPost: [],
    mainPosts: null,
    currentPostComments: null,
    myPost: [],
    meetingLogs: [],
})

const state = defaultState()

const getters = {
    meetingLogs: state => state.meetingLogs,
    bannerPost: state => state.bannerPost,
    materialPost: state => state.materialPost,
    awayPost: state => state.awayPost,
    free: state => state.free,
    notice: state => state.notice,
    suggest: state => state.suggest,
    mainPosts: state => state.mainPosts,
    currentPostComments: state => state.currentPostComments,
    myPost: state => state.myPost,
}

const actions = {
    async getMeetingLogPosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 7)
        commit('setMeetingLogPosts', [...getters.meetingLogs, ...data])
    },
    async getBannerPosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 6)
        commit('setBannerPosts', [...getters.bannerPost, ...data])
    },
    async getMaterialPosts({ commit, getters }, page = 0) {
        const { data } = await postService.getPosts.all(page, 5)
        commit('setMaterialPosts', [...getters.materialPost, ...data])
    },
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
    async getMyPost({ commit, getters }, { postType = -1, page }) {
        const { data } = await postService.getPosts.getPostByMe(page, postType)
        commit('setMyPost', [...getters.myPost, ...data])
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
        const { data: materialPost } = await postService.getPosts.all(0, 5)
        const { data: bannerPost } = await postService.getPosts.all(0, 6)
        const { data: meetingLog } = await postService.getPosts.all(0, 7)
        commit('setFreePosts', free)
        commit('setNoticePosts', notice)
        commit('setSubmitAwayPosts', away)
        commit('setSuggestPosts', suggest)
        commit('setMaterialPosts', materialPost)
        commit('setBannerPosts', bannerPost)
        commit('setMeetingLogPosts', meetingLog)
    },
    async getCurrentPostComments({ commit }, postId) {
        const { data: comments } = await commentsService.comment.getAllComments(postId)
        commit('setCurrentPostComments', comments)
    },
}

const mutations = {
    setMeetingLogPosts(state, value) {
        state.meetingLogs = value
    },
    setBannerPosts(state, value) {
        state.bannerPost = value
    },
    setMaterialPosts(state, value) {
        state.materialPost = value
    },
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
    setMyPost(state, value) {
        state.myPost = value
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
