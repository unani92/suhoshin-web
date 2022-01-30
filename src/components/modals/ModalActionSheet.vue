<template>
    <div class="modal-action-sheet">
        <transition name="slide-up">
            <div v-show="show" @click="() => close()" class="sheet" :style="options.style">
                <div class="buttons">
                    <button
                        @click="close(btn.handler)"
                        :key="idx"
                        v-for="(btn, idx) in options.buttons"
                        class="btn"
                        :class="[btn.class, options.buttons.length === 1 ? 'btn-single' : '']"
                        v-html="$translate(btn.label)"
                    />
                </div>
                <button @click="close" v-html="$translate('CLOSE')" class="btn-close" />
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'ModalActionSheet',
    props: ['options'],
    data: () => ({
        show: false,
    }),
    mounted() {
        setTimeout(() => {
            this.show = true
        })
    },
    methods: {
        close(handler) {
            this.show = false
            setTimeout(() => {
                this.$emit('close')
                if (handler) handler()
            }, 400)
        },
    },
}
</script>

<style lang="scss" scoped>
.modal-action-sheet {
    padding: 0 !important;

    .sheet {
        position: absolute;
        padding-top: 100vh;
        left: 16px;
        bottom: 32px;
        right: 16px;

        .buttons {
            width: 100%;
            margin-bottom: 8px;
            border-radius: 8px;
        }

        .btn,
        .btn-close {
            height: 50px;
            width: 100%;
            background: white;
            font-size: 15px;
            font-weight: normal;
            border: 0;

            @include f-regular;
        }

        .btn {
            border-radius: 0;

            &:not(:last-child) {
                border-bottom: solid 1px $grey-02;
            }

            &:first-child {
                border-radius: 8px 8px 0 0;
            }

            &:last-child {
                border-radius: 0 0 8px 8px;
            }

            &.btn-single {
                border-radius: 8px;
            }
        }

        .btn-close {
            border-radius: 8px;
            color: $grey-08;
        }
        .inactive {
            background-color: $grey-05;
        }
    }
}
</style>
