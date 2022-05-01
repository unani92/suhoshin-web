<template>
    <div class="checkbox" :class="{ checked: value }" @click="onClickCheckbox">
        <i class="material-icons" v-if="value">check</i>
    </div>
</template>
<script>
export default {
    name: 'Checkbox',
    props: ['value'],
    methods: {
        onClickCheckbox(event) {
            event.stopPropagation()
            this.$emit('input', this.value !== true)
            this.$emit('select')
        },
    },
}
</script>
<style scoped lang="scss">
.checkbox {
    border-radius: 2px;
    width: 18px;
    height: 18px;
    border: 1.5px solid $grey-05;
    transition: all 0.25s ease;
    @include center;

    .material-icons {
        font-size: 16px;
        font-weight: 700;
        color: white;
        transition: all 0.25s ease;
    }

    &.checked {
        border: none;
        background: $suhoshin-red;
    }

    &.white {
        border: 2px solid white;

        &.checked {
            background: white;

            .material-icons {
                color: $suhoshin-red;
            }
        }
    }
}
</style>
