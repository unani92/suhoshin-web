<template>
    <div class="modal-basic">
        <div v-if="options.title" class="head">
            <div class="title" :class="options.titleClass" v-html="$translate(title)" />
            <img
                v-if="showCloseButton"
                @click="$emit('close')"
                :src="require(`@/assets/images/icons/close.png`)"
                width="24px"
                height="24px"
                class="m-r-10"
            />
        </div>
        <div class="body" :class="{ 'm-t-0': options.hideHeader }">
            <div v-html="body" />
            <TextareaWithX
                v-model="inputValue"
                v-if="options.input"
                :is-input-mode="true"
                :placeholder="options.input.placeholder || `입력해주세요`"
            />
        </div>
        <div v-if="buttons && actionAlert" class="buttons-action">
            <button
                @click="onClickButton(btn)"
                class="btn btn-block"
                :class="btn.class"
                :key="idx"
                v-for="(btn, idx) in buttons"
                v-html="$translate(btn.label)"
            />
        </div>
        <div v-if="buttons && !actionAlert" class="buttons-basic">
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
    name: 'ModalBasic',
    props: ['options'],
    data: () => ({ inputValue: null }),
    mounted() {
        document.addEventListener('keydown', this.onKeydown)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeydown)
    },
    computed: {
        title() {
            return (this.options || {}).title
        },
        body() {
            return (this.options || {}).body
        },
        buttons() {
            return (this.options || {}).buttons || []
        },
        actionAlert() {
            return this.options.actionAlert
        },
        showCloseButton() {
            return (this.options || {}).showCloseButton || null
        },
    },
    methods: {
        onClickButton(btn) {
            if (this.options.input) {
                const valid = this.options.input.validator()
                if (!valid) return
            }

            this.$emit('close', this.buttons.indexOf(btn))
        },
        onKeydown(event) {
            if (event.key === 'Enter' && this.buttons) {
                const confirmButton = this.buttons[this.buttons.length - 1]
                if (confirmButton) this.onClickButton(confirmButton)
            }
        },
    },
}
</script>
<style scoped lang="scss">
.modal-basic {
    width: 100%;
    .body {
        font-size: 14px;
        line-height: 24px;
        color: #111111;
    }
}
</style>
