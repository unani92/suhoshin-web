<template>
    <div class="vote-detail">
        <StackRouterHeaderBar :show-title="true" :title="$translate('VOTE_BOARD')" />
        <AdminUserComponent :created_at="vote.created_at" />
        <div class="content-header">
            <h3 class="lines-1" v-html="vote.title" />
            <TimeLeft :vote="vote" />
        </div>
        <div class="content-main">
            <img :src="vote.thumbnail" alt="" />
            <p class="content-text" v-html="vote.content.split(/\n/).join('<br>')" />
            <div class="vote-items">
                <div class="item"></div>
            </div>
        </div>
        <BottomButton label="투표하기" />
    </div>
</template>

<script>
import voteService from '@/services/vote'
import TimeLeft from '@/routes/vote/components/TimeLeft'

export default {
    name: 'VoteDetailPage',
    props: {
        vote: Object,
    },
    components: { TimeLeft },
    data: () => ({
        voteContentInfo: null,
    }),
    async mounted() {
        const { data } = await voteService.getVoteInfo(this.vote.id)
        this.voteContentInfo = data
    },
}
</script>

<style scoped lang="scss">
.vote-detail {
    .content-header {
        padding: 12px 16px;
        @include between;

        h3 {
            max-width: 70%;
        }
    }
    .content-main {
        img {
            width: 100vw;
            height: auto;
            margin-bottom: 16px;
        }
        .content-text {
            padding: 0 16px;
            line-height: 24px;
        }
    }
}
</style>
