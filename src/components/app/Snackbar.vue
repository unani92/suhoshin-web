<template>
    <div
        class="snackbar flex-row items-start"
        v-show="value && !$store.getters.isMobile"
        @mouseover="value = true"
        @mouseleave="value = false"
    >
        <div v-html="$translate(text)" />
        <i v-if="noclose" @click="$emit('input', false)" class="material-icons flex-wrap">cancel</i>
    </div>
</template>
<script>
export default {
    name: 'Snackbar',
    props: ['value', 'text', 'noclose'],
    watch: {
        value(newVal) {
            if (!this.noclose && newVal) setTimeout(() => this.$emit('input', false), 2000)
        },
    },
}
</script>
