<template>
    <div class="textarea-with-x flex-column select-wrapper">
        <div class="flex-fill select flex-between" @click="expandOptions" :class="{ open: expand }">
            <div v-html="isSelected.name || '선택'" />
            <img
                class="m-r-2"
                :src="require(`@/assets/images/icons/${expand ? 'arrow_open' : 'arrow_closed'}.png`)"
                width="24px"
                height="24px"
            />
        </div>
        <div v-if="expand" class="option-box">
            <div
                class="option"
                v-for="opt in options"
                :key="opt.id"
                @click="selectItem(opt)"
                :class="{ selected: isSelected === opt }"
            >
                {{ opt.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectInput',
    props: ['options', 'alreadySelected', 'scrollFix', 'stage'],
    data: () => ({
        expand: false,
        isSelected: {},
    }),
    mounted() {
        this.init()
    },
    watch: {
        stage: {
            handler() {
                this.init()
            },
            deep: true,
        },
    },
    methods: {
        expandOptions() {
            this.expand = !this.expand

            if (!this.scrollFix) {
                const dom = document.querySelector('.edit-profile-detail')
                setTimeout(() => dom.scrollBy({ top: 99999, behavior: 'smooth' }), 200)
            }
        },
        selectItem(item) {
            this.isSelected = item
            this.expand = false

            this.$emit('selected', this.isSelected)
        },
        init() {
            if (['', null, undefined].includes(this.alreadySelected) === false) {
                this.isSelected = this.options.find(item => item.id === this.alreadySelected)
            } else {
                this.isSelected = {}
            }
        },
    },
    computed: {
        expandIcon() {
            return this.expand ? 'expand_less' : 'expand_more'
        },
    },
}
</script>
<style scoped lang="scss">
.select-wrapper {
    position: relative;

    .select {
        height: 48px;
        width: 100%;
        border: 1px solid #e9e9ed;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 2px 16px;
        &.open {
            border: 1px solid #3da1ff;
        }
    }
    .option-box {
        position: absolute;
        left: 0;
        bottom: -180px;
        margin: 4px 0px;
        border-radius: 8px;
        border: 1px solid #e9e9ed;
        width: 100%;
        background: white;
        max-height: calc(48px * 3.6);
        max-height: -webkit-calc(48px * 3.6);
        max-height: -moz-calc(48px * 3.6);
        overflow-y: auto;

        .option {
            @extend .select;
            border: none;
            &.selected {
                background: #f4fcff;
                color: $blue-primary;
            }
        }
    }
}
</style>
