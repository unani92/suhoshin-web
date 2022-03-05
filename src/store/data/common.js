import commonService from '@/services/common'

const defaultState = () => ({
    groups: [],
})

const state = defaultState()

const getters = {
    groups: state => state.groups,
}

const actions = {
    async loadConstants({ commit }) {
        try {
            const { data: groups } = await commonService.loadGroups()

            commit('setConstants', {
                groups,
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },
}

const mutations = {
    setConstants(state, constants) {
        state.groups = constants.groups
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
