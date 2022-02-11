<template>
    <div class="vote">
        <main class="main" @scroll="onScroll">
            <VoteItem @click.native="onClickDetail(vote)" :vote="vote" v-for="vote in votes" :key="vote.id" />
        </main>
        <button class="btn" @click="onClickCreate">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
import VoteItem from '@/routes/votepage/components/VoteItem'

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
.btn {
    position: absolute;
    bottom: calc(#{$header-height} + 16px);
    right: 16px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.1), 2px 2px 8px 0 rgba(0, 0, 0, 0.15);
    //background-image: linear-gradient(135deg, $suhoshin-red, $pink-woman);
    background: $suhoshin-red;

    .material-icons {
        font-size: 28px;
    }
    @include center;
}
</style>
