<template>
    <div class="post-page">
        <main class="main" @scroll="onScroll">
            <PostItem @click.native="onClickItem(item)" :post="item" v-for="item in material" :key="item.id" />
        </main>
        <button v-if="showEditBtn" class="btn floating-btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
import PostItem from '@/routes/post/components/PostItem'

export default {
    name: 'MaterialPage',
    data: () => ({
        pageNum: 0,
        loading: false,
    }),
    components: { PostItem },
    async mounted() {
        await this.$store.dispatch('getMaterialPosts', this.pageNum)
    },
    beforeDestroy() {
        this.$store.commit('setMaterialPosts', [])
    },
    computed: {
        material() {
            return this.$store.getters.materialPost
        },
        me() {
            return this.$store.getters.me || {}
        },
        showEditBtn() {
            return this.me.user_status === 2
        },
    },
    methods: {
        async onScroll({ target }) {
            if (this.currentTab.length < 10 || this.loading) return

            const { scrollHeight, clientHeight, scrollTop } = target

            // 스크롤 방향이 upwards면 리턴
            if (scrollTop < this.lastScrollTop) return

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

            if (scrollTop + clientHeight > scrollHeight - 100) {
                this.loading = true
                await this.loadMore()
                this.loading = false
            }
        },
        async loadMore() {
            try {
                this.$loading(true)
                this.pageNum += 1
                await this.$store.dispatch('getMaterialPosts', this.pageNum)
            } catch (e) {
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
        },
        onClickItem(post) {
            this.$stackRouter.push({ name: 'PostDetailPage', props: { post } })
        },
        onClickCreate() {
            this.pageNum = 0
            this.$stackRouter.push({
                name: 'PostCreatePage',
            })
        },
    },
}
</script>
