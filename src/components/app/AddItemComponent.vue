<template>
    <div class="add-item" @click="onClickItem">
        <i class="material-icons">add</i>
        <span v-html="addItemText" :class="{ required: requiredItem }" />
    </div>
</template>

<script>
export default {
    name: 'AddItemComponent',
    props: {
        text: {
            type: String,
            default: '항목',
        },
        requiredItem: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        addItemText() {
            return `${this.text} 추가`
        },
    },
    methods: {
        onClickItem() {
            this.$emit('click')
        },
    },
}
</script>

<style scoped lang="scss">
.required::after {
    content: ' *';
    color: $blue-primary;
}
</style>
