<template>
    <div class="post-page">
        <HeaderBar />
        <main class="main" @scroll="onScroll">
            <PostItem @click.native="onClickItem(item)" :post="item" v-for="item in meetingLogs" :key="item.id" />
        </main>
        <button v-if="showEditBtn" class="btn floating-btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'MeetingLogsPage',
    data: () => ({
        loading: false,
        pageNum: 0,
    }),
    async mounted() {
        await this.$store.dispatch('getMeetingLogPosts', this.pageNum)
    },
    beforeDestroy() {
        this.$store.commit('setMeetingLogPosts', [])
    },
    computed: {
        meetingLogs() {
            return this.$store.getters.meetingLogs
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
            if (this.meetingLogs.length < 10 || this.loading) return

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
                await this.$store.dispatch('getMeetingLogPosts', this.pageNum)
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
                props: { pType: 7 },
            })
        },
    },
}
</script>

<style scoped lang="scss"></style>
