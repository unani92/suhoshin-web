import Vue from 'vue'
import Router from 'vue-router'
import { store as $store } from '@/store'
import NotFoundPage from '@/routes/NotFoundPage'
import HomePage from '@/routes/HomePage'
import FrontPage from '@/routes/front/FrontPage'
import VotePage from '@/routes/vote/VotePage'
import IntroducePage from '@/routes/introduce/IntroducePage'
import AdminPage from '@/routes/my-page/AdminPage'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/front',
        name: 'FrontPage',
        component: FrontPage,
    },
    {
        path: '/vote',
        name: 'VotePage',
        component: VotePage,
    },
    {
        path: '/intro',
        name: 'IntroducePage',
        component: IntroducePage,
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
    },
    {
        path: '/not-found',
        name: 'NotFoundPage',
        component: NotFoundPage,
    },
]

const createRouter = () =>
    new Router({
        mode: 'history',
        routes: [...routes],
    })
const router = createRouter()

router.beforeEach((to, from, next) => {
    const found = router.options.routes.some(r => r.name === to.name)
    if (!found) {
        return next('/not-found')
    }
    if (to.name !== 'FrontPage' && !$store.getters.me) {
        return next('/front')
    }

    window.onpopstate = () => {
        // If the dialog is opened,
        // just close the dialog and don't move route
        if ($store.getters.modals.length > 0) {
            $store.commit('popModal')
            return next(false)
        }

        if ($store.getters.pageStack.length > 0) {
            $store.dispatch('stackRouterPop')
            return next(false)
        }

        // 스택 라우터에 등록되있으면
        if ($store.getters.pageStack.length > 0) {
            $store.dispatch('stackRouterPop')
            return next(false)
        }

        if (Vue.prototype.$isRootRoute()) return next(false)
    }

    next()
})

export default router
