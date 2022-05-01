<template>
    <div class="textarea-with-x textarea-wrapper flex-row" :class="{ focus, isInputMode }">
        <input
            v-if="isInputMode"
            ref="textarea"
            v-model="text"
            class="flex-fill"
            :placeholder="placeholder"
            :type="type || 'text'"
            @focus="onFocus"
            @blur="onBlur"
            @input="onKeyUp"
            :readonly="disabled"
        />
        <textarea
            v-else
            ref="textarea"
            v-model="text"
            class="flex-fill"
            :readonly="disabled"
            :rows="textareaRows"
            :placeholder="placeholder"
            @focus="onFocus"
            @blur="onBlur"
            @input="onKeyUp"
        />
        <i
            v-if="(text || '').length > 0"
            @click="clear"
            class="material-icons flex-wrap"
            style="height: 18px; display: block !important"
            >cancel</i
        >
    </div>
</template>

<script>
import debounce from '@/modules/debounce'

export default {
    name: 'TextareaWithX',
    props: ['type', 'value', 'placeholder', 'from', 'isInputMode', 'textareaRows', 'disabled'],
    data: () => ({
        text: '',
        focus: false,
    }),
    mounted() {
        setTimeout(() => {
            this.text = this.value
        })
    },
    watch: {
        value: {
            handler() {
                // this.clear()
                this.text = this.value
            },
            deep: true,
        },
    },
    methods: {
        onKeyUp: debounce(async function () {
            setTimeout(() => {
                this.text = this.$refs.textarea.value
                this.$emit('input', this.text)
            })
        }, 200),
        // onKeyUp() {
        //     setTimeout(() => {
        //         this.text = this.$refs.textarea.value
        //         this.$emit('input', this.text)
        //     })
        // },
        clear() {
            this.text = ''
            this.$emit('input', this.text)
        },
        onFocus() {
            this.focus = true
            this.$emit('focus')
        },
        onBlur() {
            this.focus = false
            this.$emit('blur')
        },
    },
}
</script>
<!--<style scoped lang="scss">-->

<!--</style>-->
