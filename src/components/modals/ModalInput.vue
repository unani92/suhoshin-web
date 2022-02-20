<template>
    <div class="modal-basic">
        <TextareaWithX v-model="content" />
        <div class="buttons-basic m-t-16">
            <div class="flex-row">
                <div
                    @click="onClickButton(btn)"
                    :key="idx"
                    v-for="(btn, idx) in buttons"
                    class="btn-modal"
                    :class="btn.class"
                >
                    {{ btn.label | translate }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalTextArea',
    props: ['options'],
    data: () => ({
        content: null,
        buttons: [
            {
                label: 'CANCEL',
                class: 'btn-default',
            },
            {
                label: 'CONFIRM',
                class: 'btn-primary',
            },
        ],
    }),
    methods: {
        onClickButton(idx) {
            if (!idx) {
                this.$emit('close')
                return
            }

            const res = this.content
            this.$emit('close', res)
        },
    },
}
</script>

<style scoped lang="scss">
.modal-basic {
    width: 80vw !important;
}
::v-deep .textarea-with-x {
    height: 200px !important;
}
</style>
