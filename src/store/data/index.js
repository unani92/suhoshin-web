import User from './user'
import StackRouter from './stack-router'
import Vote from './vote'
import Post from './post'
import Common from './common'

const merged = {
    state: {},
    getters: {},
    mutations: {},
    actions: {},
}

const objToMerge = [User, StackRouter, Vote, Common, Post]

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
