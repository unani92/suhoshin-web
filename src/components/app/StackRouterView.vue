<template>
    <transition-group name="slide-left" tag="div">
        <template v-if="pageStack.length > 0">
            <div class="component-wrapper" key="wrapper">
                <component
                    v-show="idx === topComponentIndex"
                    class="component"
                    v-for="(page, idx) in pageStack"
                    v-bind="page.props"
                    :style="[translateX(idx), bgColor(idx)]"
                    :key="`${page.name}_${idx}`"
                    :is="component(idx)"
                />
            </div>
        </template>
    </transition-group>
</template>
<script>
import { stackRouterComponents } from '@/router/stack-router'

export default {
    name: 'StackRouterView',
    data: () => ({
        startX: null,
        initX: null,
        locked: false,
        timingFunction: {
            'ease-in-out': k => 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1),
        },
    }),
    components: stackRouterComponents,
    watch: {
        pageStack(newVal) {
            if (newVal.length === 0) {
                this.setSwipeGesture(true)
            } else {
                this.setSwipeGesture(false)
            }

            if (newVal && newVal.length > 0) {
                this.$ga.page(`/${newVal[newVal.length - 1].name}`)
                setTimeout(() => {
                    this.initEventListener()
                }, 500)
            } else {
                this.$ga.page(this.$route.path)
            }
        },
    },
    computed: {
        pageStack() {
            return this.$store.getters.pageStack || []
        },
        topComponentIndex() {
            return this.pageStack.length - 1
        },
        topComponent() {
            return this.$el.querySelector(`.component-${this.topComponentIndex}`)
        },
        hideSwipeLeftArea() {
            return (
                [
                    'SearchKeywordsPage',
                    'DatingStatusCheckPage',
                    'ReportSubmitPage',
                    'UserDetailPage',
                    'EditStylePage',
                    'SelectPersonalAgentsPage',
                    'PremiumSurveyQuestionPage',
                    'TodayMeetingPostMakePage',
                    'TodayMeetingPostDetailPage',
                    'SendContactPage',
                    'RealFriendMeetingPostDetailPage',
                    'RealFriendMeetingPostMakePage',
                    'DatingReviewPostPage',
                    'DatingCandidateSelectPage',
                    'SettingsPage',
                ].indexOf(this.pageStack[this.topComponentIndex].name) > -1
            )
        },
    },
    methods: {
        component(idx) {
            if (this.pageStack.length === 0) return ''

            return this.pageStack[idx].name
        },
        zIndex(idx) {
            return {
                'z-index': `${idx + 99}`, // 다른 z-index 적용 된 부분보다 무조건 커야하기 때문에
            }
        },
        bgColor(idx) {
            // default는 흰색
            return { 'background-color': 'white' }
        },
        generateClassName(idx) {
            return `component-${idx}`
        },
        initEventListener() {
            if (this.$isAndroid()) return

            const elem = this.$el.querySelector('.swipe-left-area')

            if (elem) {
                elem.addEventListener('touchstart', this.touchStart)
                elem.addEventListener('touchmove', this.touchMove)
                elem.addEventListener('touchend', this.touchEnd)
            }
        },
        translateX(idx) {
            if (idx !== this.topComponentIndex) return

            if (this.startX === 0) {
                return
            }

            return {
                transform: `translateX(${this.startX}px)`,
            }
        },
        unify(e) {
            return e.changedTouches ? e.changedTouches[0] : e
        },
        touchStart(event) {
            this.initX = this.unify(event).clientX
            if (this.initX > 30) return

            this.startX = this.initX
            this.locked = true
        },
        touchMove(event) {
            event.preventDefault()

            if (this.locked) {
                this.startX = this.unify(event).clientX
            }
        },
        touchEnd(event) {
            const endX = this.unify(event).clientX
            if (!this.locked) return

            if (endX > window.innerWidth / 3) {
                this.startX = window.innerWidh
                this.$stackRouter.pop()
            } else {
                this.startX = 0
            }

            this.locked = false
        },
        setSwipeGesture(allowed) {
            this.$nativeBridge.postMessage({
                action: 'allowSwipeGesture',
                value: allowed,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.swipe-left-area {
    position: absolute;
    width: 15vw;
    height: 80vh;
    z-index: 1000;
    top: 56px;
}

.component-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    transition: transform 0.1s ease-out;
    z-index: 4;
}

.component {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow-y: auto;
}
</style>
