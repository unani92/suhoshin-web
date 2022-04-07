<template>
    <div class="post-page">
        <main class="main" @scroll="onScroll">
            <PostItem @click.native="onClickItem(item)" :post="item" v-for="item in away" :key="item.id" />
        </main>
        <button v-if="showEditBtn" class="btn floating-btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
import PostItem from '@/routes/post/components/PostItem'
export default {
    name: 'AwayPage',
    data: () => ({
        pageNum: 0,
    }),
    components: { PostItem },
    async mounted() {
        await this.$store.dispatch('getSubmitAwayPosts', this.pageNum)
    },
    beforeDestroy() {
        this.$store.commit('setSubmitAwayPosts', [])
    },
    computed: {
        away() {
            return this.$store.getters.awayPost
        },
        me() {
            return this.$store.getters.me
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
                await this.$store.dispatch('getSubmitAwayPosts', this.pageNum)
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
            // if (!this.me.user_status) {
            //     this.$toast.error('정회원 인증 후 게시글 작성이 가능합니다.')
            //     return
            // }
            this.pageNum = 0
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
    overflow-y: hidden !important;

    .tabs {
        display: flex;

        .tab {
            margin-right: 8px;
            padding: 6px 18px;
            border: 1px solid black;
            border-radius: 100px;
            font-size: 14px;
            @include center;

            &.selected {
                background: $suhoshin-red;
                color: white;
                border: 1px solid $suhoshin-red;
            }
        }
    }
    .main {
        padding: 16px 0;
        height: calc(100% - 100px);
        overflow-y: auto;
    }
}
</style>
