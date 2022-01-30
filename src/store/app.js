// initial state
const defaultState = () => ({
    toast: {
        message: null,
        type: null,
        show: false,
    },
    modals: [],
    loading: {
        agents: false,
        agentRankings: false,
        chats: false,
        global: false,
        friends: false,
        requested: false,
        cardRecommendations: false,
    },
    buildNumberFrontend: null,
    niceData: null,
    deviceToken: null,
    isAppFirstLoaded: false,
    contacts: [],
    registeredContactsLength: 0,
})

const state = defaultState()

// getters
const getters = {
    toast: state => state.toast,
    modals: state => state.modals,
    loading: state => state.loading,
    global: state => state.global,
    buildNumberFrontend: state => state.buildNumberFrontend,
    niceData: state => state.niceData,
    deviceToken: state => state.deviceToken,
    isAppFirstLoaded: state => state.isAppFirstLoaded,
    contacts: state => state.contacts,
    registeredContactsLength: state => state.registeredContactsLength,
}

// actions
const actions = {
    setToast({ commit }, payload) {
        payload.show = true
        commit('setToast', payload)
    },
}

// mutations
const mutations = {
    setToast(state, payload) {
        if (!payload) {
            state.toast = {
                message: null,
                type: null,
                show: false,
            }

            return
        }

        if (payload.type !== undefined) {
            state.toast.type = payload.type
        }

        if (payload.message !== undefined) {
            if (typeof payload.message === 'string') {
                state.toast.message = payload.message
            } else if (payload.message) {
                // We decided that error will be response.data.msg
                state.toast.message = payload.message.msg
            } else {
                state.toast.message = null
            }
        }

        state.toast.show = payload.show
        state.toast.options = payload.options
    },
    setLoading(state, payload) {
        // If we use this.$loading(boolean), set global loader.
        if (typeof payload === 'boolean') {
            state.loading.global = payload
            return
        }

        // Otherwise, use given payload.
        Object.keys(payload).forEach(key => {
            if (typeof payload[key] === 'boolean') state.loading[key] = payload[key]
        })
    },
    addModal(state, modal) {
        state.modals.push(modal)
    },
    popModal(state) {
        state.modals.pop()
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
