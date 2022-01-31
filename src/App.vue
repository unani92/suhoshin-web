<template>
    <div id="app">
        <div class="flex">
            <RootHeaderBar v-if="!noheader" />
            <HeaderBar v-else-if="!noheader" class="flex-wrap" />
            <RouterView class="route" :class="{ root: $isRootRoute(), noheader: noheader, nonav: !$isRootRoute() }" />
            <ControlPanel v-if="$isRootRoute() && chatConnectionAllowed" class="flex-wrap" />
        </div>
        <StackRouterView />
        <Toast />
        <Loading :loading="$store.getters.loading.global" />
        <Modal :key="idx" :modal="modal" v-for="(modal, idx) in $store.getters.modals" />
    </div>
</template>

<script>
import RootHeaderBar from '@/components/app/RootHeaderBar'
import HeaderBar from '@/components/control-panel/HeaderBar'
import ControlPanel from '@/components/control-panel/ControlPanel'
import Toast from '@/components/app/Toast'
import Modal from '@/components/app/Modal'
import StackRouterView from '@/components/app/StackRouterView'

export default {
    components: {
        HeaderBar,
        ControlPanel,
        Toast,
        Modal,
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
            return ['FrontPage'].indexOf(this.$route.name) !== -1
        },
    },
    methods: {
        async init() {},
    },
    created() {
        this.init()
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
