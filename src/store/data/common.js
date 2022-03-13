import commonService from '@/services/common'
import gamesService from '@/services/games'

const defaultState = () => ({
    groups: [],
    games: [],
})

const state = defaultState()

const getters = {
    groups: state => state.groups,
    games: state => state.games,
}

const actions = {
    async loadConstants({ commit, dispatch }) {
        try {
            const { data: groups } = await commonService.loadGroups()
            await dispatch('loadGames')
            commit('setConstants', {
                groups,
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async loadGames({ commit }) {
        const { data } = await gamesService.getAll()
        commit('setGames', data)
    },
}

const mutations = {
    setConstants(state, constants) {
        state.groups = constants.groups
    },
    setGames(state, value) {
        state.games = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
