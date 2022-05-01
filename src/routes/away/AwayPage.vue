<template>
    <div class="post-page">
        <nav class="tabs">
            <div
                class="tab"
                :class="{ selected: item.selected }"
                v-for="item in tabItems"
                :key="item.label"
                @click="onClickTab(item)"
            >
                <div class="content">
                    <p class="label" v-html="$translate(item.label)" />
                </div>
            </div>
        </nav>
        <main class="main" @scroll="onScroll">
            <PostItem @click.native="onClickItem(item)" :post="item" v-for="item in currentTab" :key="item.id" />
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
        loading: false,
        tabItems: [
            {
                type: 3,
                label: 'AWAY',
                selected: true,
            },
            {
                type: 6,
                label: 'BANNER',
                selected: false,
            },
        ],
        selectedTab: 3,
    }),
    components: { PostItem },
    async mounted() {
        this.$store.commit('setViewPort', window.innerWidth)
        await this.$store.dispatch('getSubmitAwayPosts', this.pageNum)
        await this.$store.dispatch('getBannerPosts', this.pageNum)
    },
    beforeDestroy() {
        this.$store.commit('setSubmitAwayPosts', [])
        this.$store.commit('setBannerPosts', [])
    },
    computed: {
        away() {
            return this.$store.getters.awayPost
        },
        banner() {
            return this.$store.getters.bannerPost
        },
        me() {
            return this.$store.getters.me || {}
        },
        showEditBtn() {
            return this.selectedTab === 3 ? this.me.user_status === 2 : true
        },
        currentTab() {
            if (!this.selectedTab) return []

            return this.selectedTab === 3 ? this.away : this.banner
        },
    },
    methods: {
        onClickTab(item) {
            item.selected = true

            this.tabItems.forEach(tab => {
                if (tab.type !== item.type) {
                    tab.selected = false
                }
            })

            this.selectedTab = item.type
        },
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
            this.pageNum = 0
            this.$stackRouter.push({
                name: 'PostCreatePage',
                props: { pType: this.selectedTab },
            })
        },
    },
}
</script>
