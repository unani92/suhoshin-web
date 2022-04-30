<template>
    <div id="app">
        <div class="flex">
            <div v-if="!noheader && me">
                <RootHeaderBar />
                <ControlPanel />
            </div>
            <RouterView class="route" :class="{ root: $isRootRoute(), noheader: noheader, nonav: !$isRootRoute() }" />
        </div>
        <StackRouterView />
        <Toast />
        <Loading :loading="$store.getters.loading.global" />
        <Modal :key="idx" :modal="modal" v-for="(modal, idx) in $store.getters.modals" />
    </div>
</template>

<script>
import RootHeaderBar from '@/components/app/RootHeaderBar'
import ControlPanel from '@/components/control-panel/ControlPanel'
import Toast from '@/components/app/Toast'
import Modal from '@/components/app/Modal'
import StackRouterView from '@/components/app/StackRouterView'

export default {
    components: {
        ControlPanel,
        Toast,
        Modal,
        StackRouterView,
        RootHeaderBar,
    },
    name: 'App',
    computed: {
        // 단순히 헤더가 정말로 필요 없거나, 커스텀 헤더를 쓰는 페이지들
        noheader() {
            return ['FrontPage', 'AdminPage'].indexOf(this.$route.name) !== -1
        },
        me() {
            return this.$store.getters.me
        },
    },
    methods: {
        async init() {
            try {
                await this.$store.dispatch('loadAuthToken')
                await this.$store.dispatch('afterAuthCallbacks')
            } catch (e) {
                if (e.status === 401) {
                    this.$store.dispatch('signOut')
                }
            }
        },
    },
    created() {
        this.init()
    },
    mounted() {
        window.addEventListener('resize', e => {
            this.$store.commit('setViewPort', window.innerWidth)
        })
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
