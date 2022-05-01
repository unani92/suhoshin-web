import Vue from 'vue'
import Router from 'vue-router'
import { store as $store } from '@/store'
import NotFoundPage from '@/routes/NotFoundPage'
import HomePage from '@/routes/home/HomePage'
import FrontPage from '@/routes/front/FrontPage'
import VotePage from '@/routes/vote/VotePage'
import IntroducePage from '@/routes/introduce/IntroducePage'
import AdminPage from '@/routes/my-page/admin/AdminPage'
import PostPage from '@/routes/post/PostPage'
import AwayPage from '@/routes/away/AwayPage'
import MaterialPage from '@/routes/material/MaterialPage'
import MyPostPage from '@/routes/my-page/my-post/MyPostPage'

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
        path: '/away',
        name: 'AwayPage',
        component: AwayPage,
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
        path: '/post',
        name: 'PostPage',
        component: PostPage,
    },
    {
        path: '/material',
        name: 'MaterialPage',
        component: MaterialPage,
    },
    {
        path: '/my-post',
        name: 'MyPostPage',
        component: MyPostPage,
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

            const needSomethingBeforeDestroy = () => {
                if (!$store.getters.pageStack.length) return false

                // 백버튼 동작 시 스택라우터 팝 이전에 특정 동작이 필요한 경우 페이지명 배열에 추가
                const arr = ['PostCreatePage']

                return arr.includes($store.getters.pageStack[$store.getters.pageStack.length - 1].name)
            }

            // 등록된 핸들러가 True여서 라우트 이동을 해야하는데, 스택라우트면 pop
            if (!!allowBack && $store.getters.pageStack.length > 0) {
                if (!needSomethingBeforeDestroy()) {
                    $store.dispatch('stackRouterPop')
                }
                return next(false)
            }

            // 핸들러 동작 이후 스택라우터 팝된 상태에서 백버튼 동작 방지
            if (!!allowBack && !needSomethingBeforeDestroy()) {
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

export default router
