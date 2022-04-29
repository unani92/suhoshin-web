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
    name: 'PostPage',
    components: { PostItem },
    data: () => ({
        tabItems: [
            {
                type: 2,
                label: 'FREE',
                selected: true,
            },
            {
                type: 1,
                label: 'NOTICE',
                selected: false,
            },
            {
                type: 4,
                label: 'SUGGEST',
                selected: false,
            },
        ],
        selectedTab: 2,
        loading: false,
        pageNum: 0,
    }),
    mounted() {
        const free = this.$store.dispatch('getFreePosts', this.pageNum)
        const notice = this.$store.dispatch('getNoticePosts', this.pageNum)
        const suggest = this.$store.dispatch('getSuggestPosts', this.pageNum)

        Promise.all([free, notice, suggest])
    },
    beforeDestroy() {
        this.$store.commit('setFreePosts', [])
        this.$store.commit('setNoticePosts', [])
        this.$store.commit('setSubmitAwayPosts', [])
        this.$store.commit('setSuggestPosts', [])
    },
    computed: {
        showEditBtn() {
            if (this.me.user_status === 2) return true

            return this.selectedTab === 2 ? true : this.selectedTab === 4 && this.me.user_status === 1
        },
        me() {
            return this.$store.getters.me || {}
        },
        free() {
            return this.$store.getters.free || []
        },
        notice() {
            return this.$store.getters.notice || []
        },
        suggest() {
            return this.$store.getters.suggest || []
        },
        currentTab() {
            if (!this.selectedTab) return []

            return this.selectedTab === 1
                ? this.notice
                : this.selectedTab === 2
                ? this.free
                : this.selectedTab === 4
                ? this.suggest
                : this.away
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
                if (this.selectedTab === 1) {
                    await this.$store.dispatch('getNoticePosts', this.pageNum)
                } else if (this.selectedTab === 2) {
                    await this.$store.dispatch('getFreePosts', this.pageNum)
                }
            } catch (e) {
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
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
        onClickTab(item) {
            if (item.type === 4 && ![1, 2].includes(this.me.user_status)) {
                this.$modal
                    .basic({
                        body: '정회원부터 이용 가능합니다',
                        buttons: [
                            {
                                label: 'CANCEL',
                                class: 'btn-default',
                            },
                            {
                                label: '정회원 인증하기',
                                class: 'btn-primary',
                            },
                        ],
                    })
                    .then(res => {
                        if (res) {
                            setTimeout(() => {
                                this.$stackRouter.push({
                                    name: 'StatusUpdatePage',
                                })
                            }, 100)
                        }
                    })
                return
            }
            item.selected = true

            this.tabItems.forEach(tab => {
                if (tab.type !== item.type) {
                    tab.selected = false
                }
            })

            this.selectedTab = item.type
        },
        onClickItem(post) {
            this.$stackRouter.push({ name: 'PostDetailPage', props: { post } })
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
