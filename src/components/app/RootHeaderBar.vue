<template>
    <div class="root-header-bar">
        <div class="left">
            <img @click="$router.push('/')" :src="require('@/assets/images/suhoshin.jpeg')" alt="" />
        </div>
        <div class="right">
            <img @click="openMyPage" :src="me.thumbnail" alt="" />
        </div>
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
    methods: {
        openMyPage() {
            this.$modal.custom({
                component: 'ModalMyPage',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.root-header-bar {
    width: 100vw;
    padding: 16px;
    display: flex;
    justify-content: space-between;

    .left {
        img {
            width: 40px;
            height: auto;
            cursor: pointer;
        }
    }
    .right {
        img {
            width: 40px;
            height: auto;
            border-radius: 50%;
            cursor: pointer;
        }
    }
}
</style>
