import { store as $store } from '@/store'
import './modal'
import router from '@/router'

export const Shortcuts = {
    install(Vue) {
        Vue.prototype.$translate = key => Vue.options.filters.translate(key)

        Vue.prototype.$backHandlers = {}

        // 현재 라우트의 백 버튼에 대한 동작을 오버라이드하는 콜백을 등록한다
        // 스택라우터의 경우 vue-router를 사용하지 않기 때문에 스택라우터에서 백핸들러를 사용하려면 parameter로 라우트 이름을 직접 전달한다
        Vue.prototype.$registerBackHandler = (callback, routeName) => {
            const name = routeName || router.currentRoute.name
            Vue.prototype.$backHandlers[name] = callback
        }

        Vue.prototype.$unregisterBackHandler = routeName => {
            const name = routeName || router.currentRoute.name
            delete Vue.prototype.$backHandlers[name]
        }

        Vue.prototype.$actionSheet = ({ buttons, style }) => {
            return Vue.prototype.$modal.custom({
                component: 'ModalActionSheet',
                options: {
                    buttons,
                    style,
                },
            })
        }

        Vue.prototype.$isRootRoute = () =>
            ['FrontPage', 'VotePage', 'IntroducePage'].indexOf(router.currentRoute.name) !== -1

        Vue.prototype.$loading = payload => {
            $store.commit('setLoading', payload)
        }

        Vue.prototype.$copy = obj => JSON.parse(JSON.stringify(obj))

        Vue.prototype.$mustParse = str => {
            let obj
            try {
                obj = JSON.parse(str)
            } catch (e) {}
            return obj
        }

        Vue.prototype.$case = Vue.options.filters.$case

        Vue.prototype.$isTestEnv = () => ['test', 'development'].includes(process.env.NODE_ENV)

        Vue.prototype.$waitFor = timeout => new Promise(resolve => setTimeout(resolve, timeout)) // timeout 동안 기다리기
    },
}

export const Toast = {
    install(Vue) {
        Vue.prototype.$toast = {
            // 토스트메시지 위치 조정이 가능하도록 옵션 값 인자로 전달 가능
            success: (message, position, duration) =>
                $store.dispatch('setToast', {
                    message,
                    type: 'success',
                    options: {
                        position,
                        duration,
                    },
                }),
            error: (message, position, duration) =>
                $store.dispatch('setToast', {
                    message,
                    type: 'error',
                    options: {
                        position,
                        duration,
                    },
                }),
        }
    },
}

export const Distance = {
    install(Vue) {
        Vue.prototype.$distance = (loc1, loc2) => {
            if (!loc1 || !loc2) return

            const lat1 = parseFloat(loc1.lat)
            const lon1 = parseFloat(loc1.lng)
            const lat2 = parseFloat(loc2.lat)
            const lon2 = parseFloat(loc2.lng)

            const R = 6371
            const dLat = ((lat2 - lat1) * Math.PI) / 180
            const dLon = ((lon2 - lon1) * Math.PI) / 180
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            const d = R * c
            return Math.floor(d)
        }
    },
}

export const Scroll = {
    install(Vue) {
        const duration = 50
        const increment = 5

        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
        }

        const animateScroll = (el, currentTime, start, change, limit, direction) => {
            currentTime += increment
            if (direction === 'up' || direction === 'down') {
                el.scrollTop = easeInOutQuad(currentTime, start, change, duration)
            }

            if (direction === 'left' || direction === 'right') {
                el.scrollLeft = easeInOutQuad(currentTime, start, change, duration)
            }

            if (currentTime < duration) {
                if (!limit) {
                    setTimeout(() => animateScroll(el, currentTime, start, change, limit, direction), increment)
                } else {
                    if (direction === 'up' && start - el.scrollTop < limit) {
                        setTimeout(() => animateScroll(el, currentTime, start, change, limit, direction), increment)
                    }
                    if (direction === 'down' && el.scrollTop - start < limit) {
                        setTimeout(() => animateScroll(el, currentTime, start, change, limit, direction), increment)
                    }
                    if (direction === 'left' && start - el.scrollLeft < limit) {
                        setTimeout(() => animateScroll(el, currentTime, start, change, limit, direction), increment)
                    }
                    if (direction === 'right' && el.scrollLeft - start < limit) {
                        setTimeout(() => animateScroll(el, currentTime, start, change, limit, direction), increment)
                    }
                }
            }
        }

        Vue.prototype.$scroll = {
            up: (el, animate, limit) => {
                if (!el) return

                const currentTime = 0
                const start = el.scrollTop
                const change = 0 - start

                if (animate) {
                    animateScroll(el, currentTime, start, change, limit, 'up')
                } else {
                    el.scrollTop = el.scrollTop - limit || 0
                }
            },
            down: (el, animate, limit) => {
                if (!el) return

                const currentTime = 0
                const start = el.scrollTop
                const change = el.scrollHeight - start

                if (animate) {
                    animateScroll(el, currentTime, start, change, limit, 'down')
                } else {
                    el.scrollTop = limit || el.scrollHeight
                }
            },
            left: (el, animate, limit) => {
                if (!el) return

                const currentTime = 0
                const start = el.scrollLeft
                const change = 0 - start

                if (animate) {
                    animateScroll(el, currentTime, start, change, limit, 'left')
                } else {
                    el.scrollLeft = el.scrollLeft - limit || 0
                }
            },
            right: (el, animate, limit) => {
                if (!el) return

                const currentTime = 0
                const start = el.scrollLeft
                const change = el.scrollWidth - start

                if (animate) {
                    animateScroll(el, currentTime, start, change, limit, 'right')
                } else {
                    el.scrollLeft = limit || el.scrollWidth
                }
            },
        }
    },
}

export const StackRouter = {
    install(Vue) {
        Vue.prototype.$stackRouter = {
            push: pageObj => {
                $store.dispatch('stackRouterPush', pageObj)
            },
            pop: () => {
                $store.dispatch('stackRouterPop')
            },
            replace: pageObj => {
                $store.dispatch('stackRouterReplace', pageObj)
            },
            popTo: length => {
                $store.dispatch('stackRouterPopTo', length)
            },
            clear: () => {
                $store.dispatch('stackRouterClear')
            },
        }
    },
}
