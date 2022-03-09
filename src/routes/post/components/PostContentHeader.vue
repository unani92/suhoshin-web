<template>
    <div class="content-header">
        <div class="left">
            <img :src="postUser.thumbnail" alt="" />
            <div class="name-post">
                <div class="name" v-text="postUser.nickname" />
                <div class="post-info">
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
        </div>
        <div class="timestamp f-14">
            <span v-text="timeStamp" />
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
    name: 'PostContentHeader',
    props: ['post'],
    computed: {
        postUser() {
            return this.post.user
        },
        timeStamp() {
            const createdAt = moment(this.post.created_at)
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

<style scoped lang="scss">
.content-header {
    @include between;
    padding: 8px 16px;
    border-bottom: 1px solid $grey-02;

    .left {
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .post-info {
            @include center;

            .item {
                i {
                    font-size: 16px;
                    color: $grey-04;
                    margin-right: 4px;
                }
                display: flex;
                align-items: center;
                font-size: 12px;
            }
        }
    }
}
</style>
