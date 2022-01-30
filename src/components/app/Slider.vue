<template>
    <div class="slider">
        <div class="range">
            <span v-if="title" class="c-black" v-html="title" />
            <span class="c-primary f-14 spoqa-f-medium" v-html="rangeStringify" />
        </div>
        <VueSlider v-model="myRange" v-bind="sliderOptions" @change="$emit('change')" />
        <div class="min-max m-t-4">
            <div v-html="`${sliderOptions.min}${unit}`" />
            <div v-html="sliderOptions.max + unit + `+`" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slider',
    props: {
        title: {
            type: String,
        },
        range: {
            type: Array,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        sliderOptions: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        myRange: [],
    }),
    mounted() {
        this.init()
    },
    computed: {
        rangeStringify() {
            return `<span class='range-start f-bold'>${this.myRange[0]}</span> ~ <span class='range-end f-bold'>${this.myRange[1]}</span>${this.unit}`
        },
    },
    methods: {
        init() {
            this.myRange = [...this.range]
        },
    },
}
</script>

<style lang="scss" scoped>
.slider {
    .range {
        @include flex-row;
        @include flex-between;
        @include spoqa-f-medium;
        font-size: 16px;
        margin: 32px 20px 12px;
    }

    .vue-slider {
        z-index: 1;
        margin: 0 20px;
    }

    .min-max {
        margin: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: $grey-08;
    }
}
</style>
