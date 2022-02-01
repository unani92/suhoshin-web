import voteService from '@/services/vote'

const defaultState = () => ({
    votes: [],
})

const state = defaultState()

const getters = {
    votes: state => state.votes,
    settings: state => state.settings,
    header: state => state.header,
}

const actions = {
    async loadVotes({ commit, getters }) {
        try {
            const { data } = await voteService.getAll()
            commit('setVotes', data)
        } catch (e) {
            return Promise.reject(e)
        }
    },
}

const mutations = {
    setVotes(state, value) {
        state.votes = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
