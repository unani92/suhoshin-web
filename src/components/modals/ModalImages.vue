<template>
    <div class="modal-images">
        <div class="close">
            <i @click="$emit('close')" class="material-icons">close</i>
        </div>
        <div class="flex-row">
            <img @click="$emit('close')" class="img-profile p-relative" v-lazy="images[currentIndex]" />
        </div>
        <div class="icons flex-row">
            <i @click="onClickLeft" class="material-icons m-r-8">chevron_left</i>
            <i @click="onClickRight" class="material-icons m-l-8">chevron_right</i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalImages',
    props: ['options'],
    computed: {
        images() {
            return this.options.images || []
        },
        chevronLeft() {
            return this.currentIndex <= 0 ? 'o-0' : 'cursor-pointer'
        },
        chevronRight() {
            return this.currentIndex >= this.images.length - 1 ? 'o-0' : 'cursor-pointer'
        },
    },
    data: () => ({
        currentIndex: 0,
    }),
    methods: {
        onClickLeft() {
            if (this.currentIndex > 0) {
                this.currentIndex--
            }
        },
        onClickRight() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++
            }
        },
    },
}
</script>
