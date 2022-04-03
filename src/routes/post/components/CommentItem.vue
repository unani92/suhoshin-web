<template>
    <div class="comment-item">
        <div class="top">
            <div class="user-info">
                <span class="name">{{ user.user_status === 2 ? '관리자' : user.nickname }}</span>
                <i @click="clickAddMenus" class="material-icons f-14 m-l-8">more_horiz</i>
            </div>
            <div class="timestamp">{{ timeStamp }}</div>
        </div>
        <div class="bottom">
            <div class="content">
                <i v-if="comment.secret && !editMode" class="material-icons f-14 m-r-4">lock</i>
                <p v-if="!editMode" class="content" v-text="$translate(comment.content)" />
                <div v-else class="w-100">
                    <TextareaWithX v-model="commentContent" />
                    <div class="btns">
                        <div @click="cancelEditMode" class="btn btn-brd">취소</div>
                        <div @click="editComment" class="btn btn-brd m-r-8">수정</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="replies-container">
            <div v-if="replyMode" class="reply-textarea">
                <TextareaWithX v-model="replyContent" />
                <div class="btns">
                    <div @click="cancelReplyMode" class="btn btn-brd">취소</div>
                    <div @click="submitReply" class="btn btn-brd m-r-8">작성</div>
                    <div class="check-box" @click="secretReply = !secretReply">
                        <i class="material-icons f-18">{{ `check_box${secretReply ? '' : '_outline_blank'}` }}</i>
                        <span class="f-14">비밀댓글</span>
                    </div>
                </div>
            </div>
            <Replies :post="post" :replies="replies" v-if="replies.length" />
        </div>
    </div>
</template>

<script>
import commentsService from '@/services/comments'
import Replies from '@/routes/post/components/Replies'

export default {
    name: 'CommentItem',
    props: ['comment', 'post'],
    components: { Replies },
    data: () => ({
        editMode: false,
        replyMode: false,
        commentContent: null,
        replyContent: null,
        secretReply: false,
    }),
    computed: {
        me() {
            return this.$store.getters.me
        },
        user() {
            return this.comment.user
        },
        replies() {
            return this.comment.replies
        },
        timeStamp() {
            const createdAt = this.$moment(this.comment.created_at).subtract(9, 'hours')
            const now = this.$moment()
            const dateDiff = now.diff(createdAt, 'days')
            const hourDiff = now.diff(createdAt, 'hours')
            const minDiff = now.diff(createdAt, 'minutes')

            if (dateDiff > 0) return `${dateDiff}일 전`
            if (hourDiff > 0) return `${hourDiff}시간 전`
            return `${minDiff}분 전`
        },
        buttons() {
            const btns = [
                {
                    label: '수정하기',
                    handler: () => {
                        this.editMode = true
                        this.commentContent = this.comment.content
                    },
                },
                {
                    label: '삭제하기',
                    handler: () => {
                        setTimeout(async () => {
                            const idx = await this.$modal.basic({
                                body: '정말 삭제하시겠습니까?',
                                buttons: [
                                    {
                                        label: 'CANCEL',
                                        class: 'btn-default',
                                    },
                                    {
                                        label: '삭제',
                                        class: 'btn-primary',
                                    },
                                ],
                            })
                            if (idx) {
                                const { data } = await commentsService.comment.deleteComment(this.comment.id)
                                await this.$store.dispatch('getCurrentPostComments', this.post.id)

                                this.$toast.success(data.msg)
                            }
                        }, 200)
                    },
                },
                {
                    label: '답글달기',
                    handler: () => {
                        this.replyMode = true
                    },
                },
            ]

            return this.me.id === this.user.id ? btns : btns.slice(2, btns.length)
        },
    },
    methods: {
        cancelEditMode() {
            this.editMode = false
            this.commentContent = null
        },
        cancelReplyMode() {
            this.replyMode = false
            this.replyContent = null
        },
        async submitReply() {
            if (!this.replyContent) return

            const { data } = await commentsService.reply.createReply({
                secret: this.secretReply,
                content: this.replyContent,
                comment_id: this.comment.id,
            })
            this.$set(this.post, 'comments', this.post.comments + 1)
            this.$toast.success(data.msg)
            await this.$store.dispatch('getCurrentPostComments', this.post.id)
            this.cancelReplyMode()
        },
        async editComment() {
            const { data } = await commentsService.comment.fixComment(this.comment.id, {
                content: this.commentContent,
            })
            await this.$store.dispatch('getCurrentPostComments', this.post.id)
            this.cancelEditMode()
            this.$toast.success(data.msg)
        },
        clickAddMenus() {
            if (this.editMode) return

            this.$actionSheet({ buttons: this.buttons })
        },
    },
}
</script>

<style scoped lang="scss">
.comment-item {
    padding: 8px 0;
    border-bottom: 1px solid $grey-01;

    .top {
        @include between;
        font-size: 12px;

        .user-info {
            display: flex;
            align-items: center;
        }
    }
    .bottom {
        margin-top: 8px;

        .content {
            display: flex;
            align-items: center;
            p {
                white-space: pre-line;
                line-height: 16px;
                font-size: 14px;
            }
        }
    }
    .btns {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        margin-top: 8px;

        .btn {
            width: fit-content !important;
            height: fit-content !important;
            padding: 4px 8px !important;
        }
    }
    .replies-container {
        margin-top: 8px;
        padding-left: 16px;

        .check-box {
            display: flex;
            align-items: center;
            margin-right: 8px;
        }
    }
}
</style>
