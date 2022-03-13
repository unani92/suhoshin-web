<template>
    <div class="hot-posts">
        <div class="hot-header">
            <div class="icon">
                <i class="material-icons">done</i>
            </div>
            <span>인기글</span>
        </div>
        <div class="container">
            <HotPostItem :hot-post="item" v-for="item in hotPosts" :key="item.id" />
        </div>
    </div>
</template>

<script>
import HotPostItem from '@/routes/home/components/HotPostItem'
export default {
    name: 'HotPosts',
    components: { HotPostItem },
    computed: {
        hotPosts() {
            return (this.$store.getters.mainPosts || {}).hot || []
        },
    },
}
</script>

<style scoped lang="scss">
.hot-posts {
    width: 100%;
    padding: 16px;

    .hot-header {
        background: $suhoshin-red;
        display: flex;
        align-items: center;
        padding: 4px 8px;
        color: white;
        @include spoqa-f-medium;

        .icon {
            background: white;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 4px;
            @include center;
            i {
                color: $suhoshin-red;
                font-size: 14px;
            }
        }
    }
}
</style>
