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
        <main class="main">
            <PostItem :post="item" v-for="item in currentTab" :key="item.id" />
        </main>
        <button class="btn floating-btn" @click="onClickCreate">
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
        ],
        selectedTab: 2,
    }),
    mounted() {
        if (this.free.length || this.notice.length) return

        const free = this.$store.dispatch('getFreePosts', 0)
        const notice = this.$store.dispatch('getNoticePosts', 0)

        Promise.all([free, notice])
    },
    computed: {
        me() {
            return this.$store.getters.me
        },
        free() {
            return this.$store.getters.free
        },
        notice() {
            return this.$store.getters.notice
        },
        currentTab() {
            if (!this.selectedTab) return []

            return this.selectedTab === 1 ? this.notice : this.free
        },
    },
    methods: {
        onClickCreate() {
            this.$stackRouter.push({
                name: 'PostCreatePage',
            })
        },
        onClickTab(item) {
            item.selected = true

            this.tabItems.forEach(tab => {
                if (tab.type !== item.type) {
                    tab.selected = false
                }
            })

            this.selectedTab = item.type
        },
    },
}
</script>

<style scoped lang="scss">
.post-page {
    padding: 16px;
    //position: relative;

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
    }
}
</style>
