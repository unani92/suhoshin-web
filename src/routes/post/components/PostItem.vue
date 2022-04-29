<template>
    <div class="post-item">
        <div class="left">
            <div class="top m-b-8">
                <div
                    class="post-type"
                    :class="`post-type-${post.post_type}`"
                    v-html="$translate(`POST_TYPE_${post.post_type}`)"
                />
                <div class="post-title lines-2" v-html="post.title" />
                <div v-if="isNew" class="new-badge">N</div>
            </div>
            <div class="bottom">
                <div class="user-name m-r-8" v-html="showUserName" />
                <div class="time-stamp m-r-8" v-html="timeStamp" />
                <div class="view-cnt item m-r-8">
                    <i class="material-icons">visibility</i>
                    <span v-html="post.hits" />
                </div>
                <div class="thumb item" v-show="post.post_type !== 3">
                    <i class="material-icons">thumb_up_alt</i>
                    <span v-html="post.thumbs" />
                </div>
            </div>
        </div>
        <div class="comments">{{ post.comments }}</div>
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
            const createdAt = this.$moment(this.post.created_at).subtract(9, 'hours')
            const now = moment()
            const dateDiff = now.diff(createdAt, 'days')
            const hourDiff = now.diff(createdAt, 'hours')
            const minDiff = now.diff(createdAt, 'minutes')

            if (dateDiff > 0) return `${dateDiff}일 전`
            if (hourDiff > 0) return `${hourDiff}시간 전`
            return `${minDiff}분 전`
        },
        showUserName() {
            if (this.post.post_type === 1) return '관리자'

            return this.post.user.nickname
        },
    },
}
</script>
