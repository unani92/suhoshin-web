<template>
    <div class="vote">
        <main class="main" @scroll="onScroll">
            <VoteItem @click.native="onClickDetail(vote)" :vote="vote" v-for="vote in votes" :key="vote.id" />
        </main>
        <button v-if="$store.getters.me.user_status === 2" class="btn floating-btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
import VoteItem from '@/routes/vote/components/VoteItem'

export default {
    name: 'VotePage',
    data: () => ({
        lastScrollTop: 0,
        page: 0,
    }),
    components: {
        VoteItem,
    },
    computed: {
        votes() {
            return this.$store.getters.votes || []
        },
    },
    methods: {
        onClickCreate() {
            try {
                this.$stackRouter.push({ name: 'VoteCreatePage' })
            } catch (e) {
                console.log(e)
            }
        },
        onClickDetail(vote) {
            this.$stackRouter.push({ name: 'VoteDetailPage', props: { vote } })
        },
        async init() {
            try {
                this.$loading(true)
                await this.$store.dispatch('loadVotes')
            } catch (e) {
                this.$toast.error(e.data)
            } finally {
                this.$loading(false)
            }
        },
        async onScroll({ target }) {
            if (this.votes.length < 10) return

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
                this.page += 1
            } catch (e) {
                this.$toast.error(e.data)
            } finally {
                this.$loading(false)
            }
        },
    },
    async mounted() {
        await this.init()
    },
}
</script>

<style scoped lang="scss">
.vote {
    padding: 16px;
}
</style>
