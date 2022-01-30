import Vue from 'vue'
/**
 * pageObj = { page, props }
 */
const defaultState = () => ({
    pageStack: [],
    currentPage: null,
})

const state = defaultState()

const getters = {
    pageStack: state => state.pageStack,
    current: state => state.currentPage,
}

const actions = {
    stackRouterPush({ commit }, pageObj) {
        commit('pushPageStack', pageObj)
    },
    stackRouterPop({ commit, getters }) {
        const currentStack = getters.pageStack[getters.pageStack.length - 1] || {}
        const currentBackHandler = Vue.prototype.$backHandlers[currentStack.name]
        let pop = true

        if (currentBackHandler) {
            pop = currentBackHandler()
        }

        if (pop) {
            commit('popPageStack')
        }
    },
    stackRouterReplace({ commit }, pageObj) {
        commit('replacePageStack', pageObj)
    },
    stackRouterPopTo({ commit }, length) {
        if (!length) return

        for (let i = 0; i < length; i += 1) {
            commit('popPageStack')
        }
    },
    stackRouterClear({ commit }) {
        commit('clearPageStack')
    },
}

const mutations = {
    popPageStack(state) {
        if (state.pageStack.length > 0) {
            state.pageStack.pop()
            state.currentPage = state.pageStack[state.pageStack.length - 1]
        }
    },
    pushPageStack(state, pageObj) {
        const newStack = [...state.pageStack, pageObj]
        state.pageStack = [...newStack]
        state.currentPage = pageObj
    },
    replacePageStack(state, pageObj) {
        if (state.pageStack.length > 0) {
            const stack = state.pageStack
            stack.splice(stack.length - 1, 1, pageObj)
            state.pageStack = [...stack]
        } else {
            state.pageStack = [pageObj]
        }
    },
    clearPageStack(state) {
        if (state.pageStack.length === 0) return

        state.pageStack = []
        state.currentPage = null
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
