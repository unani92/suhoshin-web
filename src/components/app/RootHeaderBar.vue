<template>
    <div class="root-header-bar">
        <img :src="require('@/assets/images/suhoshin.jpeg')" alt="" />
        <img :src="me.thumbnail" alt="" />
    </div>
</template>

<script>
export default {
    name: 'RootHeaderBar',
    computed: {
        me() {
            return this.$store.getters.me
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.root-header-bar {
    width: 100vw;
    //height: 48px;
    //padding: 20px;
    display: flex;
    justify-content: space-between;
}
</style>
