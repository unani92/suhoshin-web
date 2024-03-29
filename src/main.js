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

import * as filter from '@/filters'
import * as Global from '@/plugins/global'
import * as directives from '@/directives'
import { store } from '@/store'

import CheckBox from '@/components/app/CheckBox'
import Loading from '@/components/app/Loading'
import Snackbar from '@/components/app/Snackbar'
import BottomButton from '@/components/app/BottomButton'
import TextareaWithX from '@/components/app/TextareaWithX'
import StackRouterView from '@/components/app/StackRouterView'
import StackRouterHeaderBar from '@/components/app/StackRouterHeaderBar'
import blankProfile from '@/assets/images/blank_profile.svg'
import AdminUserComponent from '@/components/common/AdminUserComponent'

// outer library
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import '@toast-ui/editor/dist/toastui-editor.css'
import PostItem from '@/routes/post/components/PostItem'
import HeaderBar from '@/components/control-panel/HeaderBar'

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
Vue.component('Loading', Loading)
Vue.component('Calendar', Calendar)
Vue.component('DatePicker', DatePicker)
Vue.component('AdminUserComponent', AdminUserComponent)
Vue.component('CheckBox', CheckBox)
Vue.component('PostItem', PostItem)
Vue.component('HeaderBar', HeaderBar)

require('@/assets/styles/index.scss')

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
