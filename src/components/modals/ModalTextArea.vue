<template>
    <div class="modal-basic">
        <div class="title text-center f-18 spoqa-f-bold">항목 추가</div>
        <div class="body">엔터로 구분해 주세요</div>
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

            const res = this.content.split('\n')
            this.$emit('close', res)
        },
    },
    created() {
        if (this.options.content) this.content = this.options.content
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
