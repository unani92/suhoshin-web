import Vue from 'vue'
import Router from 'vue-router'
import { store as $store } from '@/store'
import NotFoundPage from '@/routes/NotFoundPage'
import HomePage from '@/routes/HomePage'
import FrontPage from '@/routes/frontpage/FrontPage'

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
        path: '/not-found',
        name: 'NotFoundPage',
        component: NotFoundPage,
    },
]

const createRouter = () =>
    new Router({
        routes: [...routes],
    })
const router = createRouter()

router.beforeEach((to, from, next) => {
    const found = router.options.routes.some(r => r.name === to.name)
    if (!found) {
        return next('/not-found')
    }

    window.onpopstate = () => {
        // If the dialog is opened,
        // just close the dialog and don't move route
        if ($store.getters.modals.length > 0) {
            $store.commit('popModal')
            return next(false)
        }
        const currentCustomBackHandler = Vue.prototype.$backHandlers[to.name]
        if (currentCustomBackHandler) {
            const allowBack = currentCustomBackHandler()

            // 등록된 핸들러가 True여서 라우트 이동을 해야하는데, 스택라우트면 pop
            if (!!allowBack && $store.getters.pageStack.length > 0) {
                const isEditProfilePage =
                    $store.getters.pageStack[$store.getters.pageStack - 1].name === 'EditProfilePage'
                if (isEditProfilePage) {
                    return next(false)
                }
                $store.dispatch('stackRouterPop')
                return next(false)
            }

            return next(!!allowBack)
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

router.afterEach(() => {})

export default router
