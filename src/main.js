import './initCompositionAPI'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMoment from 'vue-moment'
import './modules/axios'
import VueLazyLoad from 'vue-lazyload'
import { Carousel, Slide } from 'vue-carousel'
import VueSlider from 'vue-slider-component'
import VueClipboard from 'vue-clipboard2'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

import * as filter from '@/filters'
import * as Global from '@/plugins/global'
import * as directives from '@/directives'
import { store } from '@/store'

import Snackbar from '@/components/app/Snackbar'
import BottomButton from '@/components/app/BottomButton'
import TextareaWithX from '@/components/app/TextareaWithX'
import StackRouterView from '@/components/app/StackRouterView'
import StackRouterHeaderBar from '@/components/app/StackRouterHeaderBar'
import blankProfile from '@/assets/images/blank_profile.svg'

Vue.use(VueClipboard)
Vue.use(VueLazyLoad, {
    error: blankProfile,
})

// This $bus must be defined here for this to be able to be accessed in filters, plugins, directives.
Vue.prototype.$bus = new Vue({})
Object.keys(filter).forEach(k => {
    Vue.filter(k, filter[k])
})
Object.keys(Global).forEach(k => {
    Vue.use(Global[k])
})
Object.keys(directives).forEach(k => {
    Vue.directive(k, directives[k])
})
Vue.use(VueMoment)
Vue.component('Carousel', Carousel)
Vue.component('Slide', Slide)
Vue.component('VueSlider', VueSlider)
Vue.component('Snackbar', Snackbar)
Vue.component('BottomButton', BottomButton)
Vue.component('TextareaWithX', TextareaWithX)
Vue.component('StackRouterView', StackRouterView)
Vue.component('StackRouterHeaderBar', StackRouterHeaderBar)

require('@/assets/styles/index.scss')

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')

if (process.env.NODE_ENV === 'test') {
    Sentry.init({
        dsn: 'https://f6c4e4a2ba9f4ed4bc6e1660c5dd269a@o205628.ingest.sentry.io/1435637',
        integrations: [new VueIntegration({ Vue, attachProps: true })],
    })
}
