<template>
    <div class="vote-detail">
        <StackRouterHeaderBar :show-title="true" :title="$translate('VOTE_BOARD')" />
        <AdminUserComponent :created_at="vote.created_at" />
        <div class="content">
            <div class="content-header">
                <h3 class="lines-1" v-html="vote.title" />
                <TimeLeft :vote="vote" />
            </div>
            <div class="content-main">
                <img :src="vote.thumbnail" alt="" />
                <p class="content-text" v-html="vote.content.split(/\n/).join('<br>')" />
                <div class="vote-items">
                    <div @click="clickItem(item)" class="item" v-for="item in voteContent" :key="item.id">
                        <div class="left">
                            <i
                                :class="{
                                    selected:
                                        userVote && !selected
                                            ? item.id === userVote.vote_content_id
                                            : item.id === (selected || {}).id,
                                }"
                                class="material-icons"
                                >check</i
                            >
                            <span v-html="item.content" />
                        </div>
                        <div class="right" v-if="sum > 0">
                            <span class="m-r-8">{{ voteContentInfo[item.id].count }}</span>
                            <span>({{ Math.round((voteContentInfo[item.id].count / sum) * 100) }}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomButton @click="submit" :disabled="!selected" label="투표하기" />
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
        userVote: null,
        selected: null,
        sum: 0,
    }),
    computed: {
        voteContent() {
            return this.vote.vote_content
        },
    },
    methods: {
        clickItem(item) {
            if (!this.userVote && !this.selected) this.sum += 1
            else if (this.userVote && !this.selected) this.voteContentInfo[this.userVote.vote_content_id].count -= 1

            if (this.selected) {
                this.voteContentInfo[this.selected.id].count -= 1
            }
            this.voteContentInfo[item.id].count += 1

            this.selected = item
        },
        async submit() {
            if (!this.selected) return

            let message
            if (this.userVote) {
                const {
                    data: { msg },
                } = await voteService.userVote.fix(this.vote.id, {
                    vote_content_id: this.selected.id,
                })
                message = msg
            } else {
                const {
                    data: { msg },
                } = await voteService.userVote.create({
                    vote_id: this.vote.id,
                    vote_content_id: this.selected.id,
                })
                message = msg
            }

            this.$toast.success(message)
            this.$stackRouter.pop()
        },
    },
    async mounted() {
        const { data } = await voteService.getVoteInfo(this.vote.id)
        const { data: res } = await voteService.userVote.get(this.vote.id)
        this.voteContentInfo = data
        this.userVote = res
        Object.keys(this.voteContentInfo).forEach(item => {
            this.sum += this.voteContentInfo[item].count
        })
    },
}
</script>

<style scoped lang="scss">
.vote-detail {
    .content {
        padding-bottom: 150px;
        overflow-y: auto;
    }
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
    .vote-items {
        padding: 16px;

        .item {
            @include between;
            font-size: 16px;
            line-height: 24px;
            padding: 8px;
            border: 1px solid $grey-03;
            border-radius: 8px;
            margin-bottom: 12px;

            i {
                font-size: 16px;
                margin-right: 8px;
                &.selected {
                    color: $suhoshin-red;
                }
            }
            .left {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>
