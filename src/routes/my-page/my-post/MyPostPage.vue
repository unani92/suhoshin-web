<template>
    <div class="my-post">
        <StackRouterHeaderBar title="내가쓴글" :show-title="true" />
        <div class="post-page">
            <SelectInput
                class="m-t-8"
                :scroll-fix="true"
                :options="postType"
                :placeholder="'전체'"
                @selected="selectPostType"
            />
            <main class="main" @scroll="onScroll">
                <PostItem @click.native="onClickItem(item)" :post="item" v-for="item in myPost" :key="item.id" />
            </main>
        </div>
    </div>
</template>

<script>
import SelectInput from '@/components/app/SelectInput'
import PostItem from '@/routes/post/components/PostItem'

export default {
    name: 'MyPostPage',
    components: { SelectInput, PostItem },
    data: () => ({
        page: 0,
        selectedPostType: null,
        loading: false,
    }),
    async mounted() {
        await this.$store.dispatch('getMyPost', { postType: -1, page: this.page })
    },
    beforeDestroy() {
        this.$store.commit('setMyPost', [])
    },
    computed: {
        me() {
            return this.$store.getters.me
        },
        myPost() {
            return this.$store.getters.myPost
        },
        postType() {
            const selectors = [
                {
                    id: 1,
                    name: '공지사항',
                    userStatus: [2],
                },
                {
                    id: 2,
                    name: '자유게시판',
                    userStatus: [0, 1, 2],
                },
                {
                    id: 3,
                    name: '원정신청',
                    userStatus: [2],
                },
                {
                    id: 4,
                    name: '건의사항',
                    userStatus: [1, 2],
                },
                {
                    id: 5,
                    name: '수호신 상품 구매',
                    userStatus: [2],
                },
            ]

            return this.me.user_status === 2
                ? selectors
                : selectors.filter(item => item.userStatus.includes(this.me.user_status))
        },
    },
    methods: {
        onClickItem(post) {
            this.$stackRouter.push({ name: 'PostDetailPage', props: { post } })
        },
        async selectPostType(val) {
            this.page = 0
            this.selectedPostType = val

            this.$store.commit('setMyPost', [])
            await this.$store.dispatch('getMyPost', { postType: this.selectedPostType.id, page: this.page })
        },
        async onScroll({ target }) {
            if (this.myPost.length < 10 || this.loading) return

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
                this.page += 1
                await this.$store.dispatch('getMyPost', {
                    postType: (this.selectedPostType || { id: -1 }).id,
                    page: this.page,
                })
            } catch (e) {
                console.log(e)
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.post-page {
    height: calc(100% - 52px);
    .main {
        height: calc(100% - 48px);
        overflow-y: auto;
    }
}
</style>
