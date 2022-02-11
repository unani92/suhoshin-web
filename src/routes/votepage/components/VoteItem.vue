<template>
    <div class="vote-item">
        <img class="m-r-8" :src="vote.thumbnail" alt="" />
        <div class="right">
            <div class="title">
                <span v-html="vote.title" />
                <TimeLeft :vote="vote" />
            </div>
            <div class="content lines-2" v-html="vote.content" />
        </div>
    </div>
</template>

<script>
import TimeLeft from '@/routes/votepage/components/TimeLeft'
export default {
    name: 'VoteItem',
    props: {
        vote: Object,
    },
    components: { TimeLeft },
    computed: {
        expireAt() {
            const expireAt = this.vote.expire_at

            const expire = this.$moment(expireAt).diff(this.$moment(), 'days')
            if (expire < 0) return { status: 'expired', text: '마감' }

            return expire > 0
                ? { status: 'day', text: `D-${expire + 1}` }
                : { status: 'hour', text: `${this.$moment(expireAt).diff(this.$moment(), 'hours')}시간 남음` }
        },
    },
}
</script>

<style scoped lang="scss">
.vote-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid $grey-02;
    border-radius: 8px;
    margin-bottom: 12px;

    img {
        width: 60px;
        height: 60px;
        border-radius: 12px;
    }
    .right {
        width: calc(100% - 60px);

        .title {
            font-size: 15px;
            margin-bottom: 8px;
            @include between;
            @include spoqa-f-medium;

            span {
                width: calc(100% - 60px);
                @include lines-1;
            }
        }
        .content {
            font-size: 12px;
        }
    }
}
</style>
