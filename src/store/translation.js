import json from '@/assets/translations/index.js'

const supportedLocales = ['kr', 'en']
let locale = 'kr'
const storedLocale = window.localStorage.getItem('locale')
if (supportedLocales.indexOf(storedLocale) !== -1) {
    locale = storedLocale
} else {
    window.localStorage.setItem('locale', locale)
}

const state = {
    translation: {
        locale,
        texts: json,
    },
}

const getters = {
    translation: state => state.translation,
}

const actions = {
    toggleLocale({ state, commit }) {
        const locale = state.translation.locale === 'kr' ? 'en' : 'kr'
        commit('setTranslation', { locale })
    },
}

const mutations = {
    setTranslation(state, payload) {
        if (!payload) {
            return
        }
        if (payload.locale !== undefined) {
            state.translation.locale = payload.locale
            window.localStorage.setItem('locale', payload.locale)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
