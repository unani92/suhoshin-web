<template>
    <div id="app">
        <div class="flex">
            <RootHeaderBar v-if="$isRootRoute() && !noheader" />
            <HeaderBar v-else-if="!noheader" class="flex-wrap" />
            <RouterView class="route" :class="{ root: $isRootRoute(), noheader: noheader, nonav: !$isRootRoute() }" />
            <ControlPanel v-if="$isRootRoute() && chatConnectionAllowed" class="flex-wrap" />
        </div>
        <StackRouterView />
        <Toast />
        <Loading :loading="$store.getters.loading.global" />
        <Modal :key="idx" :modal="modal" v-for="(modal, idx) in $store.getters.modals" />
        <HealthCheck />
        <ChatPump v-if="chatConnectionAllowed" />
    </div>
</template>

<script>
import RootHeaderBar from '@/components/app/RootHeaderBar'
import HeaderBar from '@/components/control-panel/HeaderBar'
import ControlPanel from '@/components/control-panel/ControlPanel'
import Toast from '@/components/app/Toast'
import Modal from '@/components/app/Modal'
import HealthCheck from '@/components/app/HealthCheck'
import StackRouterView from '@/components/app/StackRouterView'

export default {
    components: {
        HeaderBar,
        ControlPanel,
        Toast,
        Modal,
        HealthCheck,
        StackRouterView,
        RootHeaderBar,
    },
    name: 'App',
    computed: {
        chatConnectionAllowed() {
            return ['FrontPage'].indexOf(this.$route.name) === -1 && !this.$route.path.includes('/signup/')
        },
        // 단순히 헤더가 정말로 필요 없거나, 커스텀 헤더를 쓰는 페이지들
        noheader() {
            return (
                ['FrontPage', 'HomePage'].indexOf(this.$route.name) !== -1 ||
                this.$route.path.includes('/signup/verify/')
            )
        },
    },
    methods: {
        async init() {
            try {
                this.$store.dispatch('loadConstants')
                await this.$store.dispatch('loadAuthToken')
                await this.$store.dispatch('afterAuthCallbacks', { isSignIn: false })
            } catch (e) {
                if (e.status === 401) {
                    if (localStorage.getItem('tempSignupPayload')) {
                        this.$goOnboardProfile()

                        return
                    }
                    this.$store.dispatch('signOut')
                }
            }
        },
        initHackle() {
            this.$hackleClient.onReady(() => {
                const device = this.$store.getters.device

                const { id, ...rest } = device
                const user = {
                    id: device.id,
                    properties: { ...rest },
                }

                this.$store.commit('setHackleUser', user)
            })
        },
    },
    created() {
        this.init()
        // 프로필 미완료 사람들 팝업 --> 추후 삭제
    },
    async mounted() {
        this.$nativeBridge.postMessage({
            action: 'onMountWebView',
        })
        this.$store.commit('setIsAppFirstLoaded', true)

        if (this.$store.getters.me && this.$store.getters.submitAllRequired === false) {
            this.$modal.custom({
                component: 'ModalVerticalButtons',
                options: {
                    title: '프로필 입력을 완료해주세요!',
                    body: `서비스 이용을 위해서는 <b>반드시 프로필 입력이 완료</b>되어야 합니다.`,
                    buttons: [
                        {
                            label: '프로필 입력하기',
                        },
                    ],
                    height: '48px',
                    bgColor: '#111',
                    onClick: this.moveToEdit,
                    showCloseButton: true,
                },
            })
        }
    },
}
</script>

<style lang="scss" scoped>
#app {
    .route {
        height: calc(100vh - #{$header-height} * 2);
        overflow-y: auto;

        &.nonav.noheader {
            height: 100vh;
        }

        &.nonav:not(.noheader),
        &:not(.nonav).noheader {
            height: calc(100vh - #{$header-height});
        }

        &.root {
            //height: calc(100vh - (#{$root-header-height} + #{$control-panel-height}));
        }
    }
}
</style>
