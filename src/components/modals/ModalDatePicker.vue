<template>
    <div class="modal-basic">
        <DatePicker v-model="datePicked" :model-config="modelConfig" />
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
    name: 'ModalDatePicker',
    data: () => ({
        datePicked: new Date(),
        modelConfig: {
            type: 'string',
            mask: 'YYYY-MM-DD', // Uses 'iso' if missing
        },
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
        onClickButton(btn) {
            if (btn.label !== 'CONFIRM') {
                this.$emit('close')
                return
            }

            this.$emit('close', this.datePicked)
        },
    },
}
</script>

<style scoped></style>
