<template>
    <div class="post-item">
        <div class="left">
            <div class="top m-b-8">
                <div
                    class="post-type"
                    :class="`post-type-${post.post_type}`"
                    v-html="$translate(`POST_TYPE_${post.post_type}`)"
                />
                <div class="post-title" v-html="post.title" />
                <div v-if="isNew" class="new-badge">N</div>
            </div>
            <div class="bottom">
                <div class="user-name m-r-8" v-html="showUserName" />
                <div class="time-stamp m-r-8" v-html="timeStamp" />
                <div class="view-cnt item m-r-8">
                    <i class="material-icons">visibility</i>
                    <span v-html="post.hits" />
                </div>
                <div class="thumb item">
                    <i class="material-icons">thumb_up_alt</i>
                    <span v-html="post.thumbs" />
                </div>
            </div>
        </div>
        <div class="comment"></div>
    </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
    name: 'PostItem',
    props: {
        post: Object,
    },
    computed: {
        isNew() {
            const createdAt = this.post.created_at
            const dateDiff = this.$moment(createdAt).diff(this.$moment(), 'days')

            return dateDiff === 0
        },
        timeStamp() {
            const createdAt = moment(this.post.created_at)
            const now = moment()
            const dateDiff = now.diff(createdAt, 'days')
            const hourDiff = now.diff(createdAt, 'hours')
            const minDiff = now.diff(createdAt, 'minutes')

            if (dateDiff > 0) return `${dateDiff}일 전`
            if (hourDiff > 1) return `${hourDiff}시간 전`
            return `${minDiff}분 전`
        },
        showUserName() {
            if (this.post.post_type === 1) return '관리자'

            return this.post.user.nickname
        },
    },
}
</script>

<style scoped lang="scss">
.post-item {
    @include between;
    padding: 12px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid $grey-03;

    .left {
        width: 70%;

        .bottom {
            font-size: 12px;
            color: $grey-07;
            display: flex;
            align-items: center;

            .item {
                i {
                    font-size: 16px;
                    color: $grey-04;
                    margin-right: 4px;
                }
                display: flex;
                align-items: center;
            }
        }

        .top {
            display: flex;
            align-items: center;

            .post-type {
                font-size: 11px;
                padding: 2px 4px;
                margin-right: 8px;
                border-radius: 8px;
                color: white;
                background: $suhoshin-red;
                @include center;
                @include spoqa-f-medium;

                &.post-type-2 {
                    background: #111111;
                }
            }

            .new-badge {
                font-size: 10px;
                background: $suhoshin-red;
                color: white;
                padding: 2px;
                margin-left: 8px;
                border-radius: 4px;
                height: 12px;
                width: 12px;
                @include spoqa-f-medium;
                @include center;
            }
        }
    }
}
</style>
