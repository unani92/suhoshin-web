import User from './user'
import StackRouter from './stack-router'

const merged = {
    state: {},
    getters: {},
    mutations: {},
    actions: {},
}

const objToMerge = [User, StackRouter]

objToMerge.forEach(store => {
    ;['state', 'getters', 'mutations', 'actions'].forEach(storeKey => {
        Object.keys(store[storeKey]).forEach(key => {
            merged[storeKey][key] = store[storeKey][key]
        })
    })
})

merged.mutations.initAppData = state => {
    objToMerge.forEach(store => {
        Object.assign(state, store.defaultState())
    })
}

export default merged
