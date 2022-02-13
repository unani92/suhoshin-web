<template>
    <div class="menu-button" :class="{ selected: selected }" @click="$emit('click')">
        <div class="menu-label f-medium" v-html="$translate(label)" v-if="label" />
    </div>
</template>
<script>
export default {
    name: 'MenuButton',
    props: {
        label: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    computed: {},
}
</script>

<style lang="scss" scoped>
.menu-button {
    line-height: 1.15;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.selected {
        border-bottom: 2px solid $suhoshin-red;
    }

    .menu-label {
        font-size: 10px;
        text-align: center;
        color: $grey-06;
        height: 20%;
    }
}
</style>
