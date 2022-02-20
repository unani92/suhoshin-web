<template>
    <transition name="modal">
        <div class="modal" v-show="!transparent" @mousedown="closeOnMousedownMask">
            <div
                :class="
                    modal.component === 'ModalBasic'
                        ? 'modal-container-basic'
                        : modal.component === 'ModalContact'
                        ? 'modal-container-contact'
                        : 'modal-container'
                "
            >
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
        ModalCropper: () => import('@/components/modals/ModalCropper'),
        ModalDatePicker: () => import('@/components/modals/ModalDatePicker'),
        ModalTextArea: () => import('@/components/modals/ModalTextArea'),
        ModalInput: () => import('@/components/modals/ModalInput'),
        ModalIntroduceGroup: () => import('@/components/modals/ModalIntroduceGroup'),
        ModalMyPage: () => import('@/components/modals/ModalMyPage'),
        ModalImages: () => import('@/components/modals/ModalImages'),
    },
    created() {
        document.addEventListener('keydown', this.onKeydown)
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
