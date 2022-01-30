<template>
    <transition name="fade">
        <div class="toast-wrapper" v-if="toast.show" :style="position(toast.options.position)">
            <div class="toast flex-row items-center" :class="toast.type">
                <div class="flex-fill" v-html="html" />
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Toast',
    methods: {
        position(position) {
            // 만약 toast 위치 변경이 필요하다면 사용
            return position
        },
        async onClickToastAction() {
            this.removeToast(0)
            if (!this.toast.options.action) return

            this.toast.options.action()
        },
        removeToast(timeout) {
            this.toastTimeout = setTimeout(() => {
                this.$store.commit('setToast', {
                    message: null,
                    type: null,
                    show: false,
                })
            }, timeout || 20000)
        },
    },
    computed: {
        toast() {
            return this.$store.getters.toast
        },
        showToast() {
            return this.toast.show
        },
        html() {
            return this.toast.message ? this.$translate(this.toast.message).replace(/\n/g, '<br>') : ''
        },
    },
    watch: {
        showToast() {
            if (this.toast.show) {
                if (this.toastTimeout) {
                    clearTimeout(this.toastTimeout)
                }
                this.removeToast((this.toast.options || {}).duration || 2000)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
    transition: opacity 0.3s;
}

.fade-leave-active {
    transition: opacity 0.1s;
}

.toast-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    display: inline-block;
    z-index: 3000;
    pointer-events: none;
    width: fit-content !important;
    max-width: calc(100vw - 32px) !important;
    min-width: 180px;

    .toast {
        pointer-events: initial;
        padding: 9px 16px;
        color: $white;
        border-radius: 8px;
        text-align: center;
        font-family: NotoSans-Regular;
        font-size: 13px;
        line-height: 20px;

        &.success {
            opacity: 0.96;
            background-color: $grey-09;
        }

        &.error {
            opacity: 0.96;
            background-color: $pink-deep;
        }
    }
}
</style>
