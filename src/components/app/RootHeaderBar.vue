<template>
    <div class="root-header-bar">
        <div class="left">
            <i @click="$router.push('/')" class="material-icons-outlined icon">home</i>
        </div>
        <div class="right">
            <img @click="openMyPage" :src="require('@/assets/images/suhoshin.jpeg')" alt="" />
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
    align-items: center;
    .left {
        .icon {
            font-size: 32px;
            cursor: pointer;
            color: #7f7e83;
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
