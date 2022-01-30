<template>
    <transition name="modal">
        <div class="modal" v-show="!transparent" @mousedown="closeOnMousedownMask">
            <div :class="['ModalBasic'].includes(modal.component) ? 'modal-container-basic' : 'modal-container'">
                <component @close="onClose" :options="modal.options" :is="modal.component" />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    props: ['modal'],
    data: () => ({
        transparent: false,
    }),
    components: {
        ModalBasic: () => import('@/components/modals/ModalBasic'),
        ModalActionSheet: () => import('@/components/modals/ModalActionSheet'),
    },
    created() {
        document.addEventListener('keydown', this.onKeydown)

        this.$nativeBridge.postMessage({
            action: 'setCanGoBack',
            value: true,
        })
    },
    beforeDestroy() {
        this.modal.resolve()
        document.removeEventListener('keydown', this.onKeydown)
    },
    computed: {},
    methods: {
        onClose(event) {
            this.transparent = true

            if (this.modal.resolve) {
                this.modal.resolve(event)
            }

            this.$store.commit('popModal')
        },
        closeOnMousedownMask(event) {
            if ((this.modal.options || {}).preventCloseOnMousedownMask) return
            if (this.modal.component === 'ModalIntroduction') {
                window.localStorage.setItem('readIntroduction', 'true')
            }

            if (event.target.classList.contains('modal')) {
                this.onClose()
            }
        },
        onKeydown(event) {
            if (event.key === 'Escape') {
                this.onClose()
            }
        },
    },
}
</script>
