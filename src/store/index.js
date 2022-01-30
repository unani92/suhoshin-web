import Vue from 'vue'
import Vuex from 'vuex'

import App from '@/store/app'
import Data from '@/store/data/index'
import Translation from '@/store/translation'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        App,
        Data,
        Translation,
    },
})
