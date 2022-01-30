import Vue from 'vue'
import axios from '@/modules/axios'
import router from '@/router'
import userService from '@/services/user'

const transformLoginResponseToHeader = ({ token }) => ({
    Authorization: `Barer ${token}`,
})

const setHeaderAndRedirectToMain = async ({ getters, commit, dispatch, data, noRedirect }) => {
    if (!data) {
        return Promise.reject(data)
    }

    const header = transformLoginResponseToHeader(data)
    axios.setHeader(header)
    commit('setHeader', header)

    // await dispatch('afterAuthCallbacks', { isSignIn: true })

    try {
        await dispatch('afterAuthCallbacks', { isSignIn: true })
    } catch (e) {
        Vue.prototype.$toast.error(e.data.msg)
        return Promise.reject(e)
    }

    if (!noRedirect) {
        router.push({ name: 'HomePage' })
    }
}

const defaultState = () => ({
    me: null,
    profile: null,
    profileUpdateRequests: {},
    requiredKey: [
        'age',
        'height',
        'state',
        'smoking',
        'health_status',
        'religion',
        // 'intro',
        'income',
        'asset',
        'family_relations',
        'parent_status',
        'family_asset',
        'family',
        'marry_plan',
        'child_plan',
        'career_plan',
        'company',
    ],
    settings: null,
    badges: null,
    header: null,
    notifications: null,
    device: null,
    items: null,
    signupFriends: null,
    blockedCollege: [],
    blockedName: [],
    blockedCompany: [],
    profileStep: 1,
})

const state = defaultState()

const getters = {
    me: state => state.me,
    settings: state => state.settings,
    header: state => state.header,
}

const actions = {
    async loadAuthToken({ commit, dispatch, getters }) {
        const header = JSON.parse(window.localStorage.getItem('header'))

        if (!header) {
            window.localStorage.removeItem('header')
            return Promise.reject({ status: 401 })
        }

        if (header['X-User-Role'] !== 'user') return dispatch('signOut')

        if ((!header['X-User-OS'] || !header['X-User-Agent']) && getters.device) {
            header['X-User-OS'] = getters.device.os
            header['X-User-Agent'] = JSON.stringify(getters.device)
        }
        axios.setHeader(header)
        commit('setHeader', header)
    },
    async loadMe({ commit }) {
        try {
            const me = await userService.me()
            commit('setMe', me)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async loadSettings({ commit }) {
        try {
            const settings = await userService.settings()
            commit('setSettings', settings)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async signIn({ commit, getters, dispatch }, payload) {
        const data = await Vue.prototype.$http.post('v2/users/login', payload)

        if (data.role === 'agent') {
            Vue.prototype.$toast.error(data.msg)
        } else {
            Vue.prototype.$nativeBridge.postMessage({
                action: 'sendAirbridgeEvent',
                value: {
                    category: 'user_login',
                },
            })
            Vue.prototype.$nativeBridge.postMessage({
                action: 'sendFirebaseEvent',
                value: {
                    category: 'user_login',
                },
            })
            data.device = getters.device

            setHeaderAndRedirectToMain({ getters, commit, dispatch, data, noRedirect: payload.noRedirect })
        }
    },
    async signOut({ commit, getters }) {},
}

const mutations = {
    setHeader(state, header) {
        state.header = header
    },
    setMe(state, me) {
        state.me = me
    },
    setProfile(state, profile) {
        state.profile = profile
    },
    setProfileUpdateRequests(state, pur) {
        state.profileUpdateRequests = pur
    },
    setBlockedCollege(state, value) {
        state.blockedCollege = value
    },
    setBlockedCompany(state, value) {
        state.blockedCompany = value
    },
    setBlockedName(state, value) {
        state.blockedName = value
    },
    setSettings(state, settings) {
        state.settings = settings
    },
    setBadges(state, badges) {
        state.badges = badges
    },
    setNotifications(state, payload) {
        if (!payload) return

        if (payload.offset === 0 || !state.notifications) {
            state.notifications = payload.items
        } else {
            state.notifications = state.notifications.concat(payload.items)
        }
    },
    setDevice(state, device) {
        if (!device) return

        state.device = device
    },
    setItems(state, items) {
        state.items = items
    },
    setSignupFriends(state, signupFriends) {
        state.signupFriends = signupFriends
    },
    setProfileStep(state, profileStep) {
        state.profileStep = profileStep
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    defaultState,
}
