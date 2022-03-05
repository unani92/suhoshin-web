<template>
    <div class="post-page">
        <button class="btn floating-btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'PostPage',
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    methods: {
        onClickCreate() {
            this.$stackRouter.push({
                name: 'PostCreatePage',
            })
        },
    },
}
</script>

<style scoped lang="scss">
.post-page {
    padding: 16px;
    //position: relative;
}
</style>
