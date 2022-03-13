<template>
    <div class="hot-post-item" @click="onClickItem(hotPost)">
        <div class="left">
            <span class="title">{{ hotPost.title }}</span>
            <div v-if="isNew" class="new-badge">N</div>
        </div>
        <div class="right">
            <span>{{ timeStamp }}</span>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
    name: 'HotPostItem',
    props: {
        hotPost: Object,
    },
    computed: {
        isNew() {
            const createdAt = this.hotPost.created_at
            const dateDiff = this.$moment(createdAt).diff(this.$moment(), 'days')

            return dateDiff === 0
        },
        timeStamp() {
            const createdAt = this.$moment(this.post.created_at).subtract(9, 'hours')
            const now = moment()
            const dateDiff = now.diff(createdAt, 'days')
            const hourDiff = now.diff(createdAt, 'hours')
            const minDiff = now.diff(createdAt, 'minutes')

            if (dateDiff > 0) return `${dateDiff}일 전`
            if (hourDiff > 0) return `${hourDiff}시간 전`
            return `${minDiff}분 전`
        },
    },
    methods: {
        onClickItem(post) {
            this.$stackRouter.push({ name: 'PostDetailPage', props: { post } })
        },
    },
}
</script>

<style scoped lang="scss">
.hot-post-item {
    padding: 6px;
    border-bottom: 1px solid $grey-03;
    font-size: 14px;
    @include between;

    .left {
        display: flex;
        align-items: center;

        .title {
            max-width: 200px;
            @include lines-1;
        }
    }
}
</style>
