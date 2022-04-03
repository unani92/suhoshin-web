<template>
    <div class="comment-item">
        <div class="top">
            <div class="user-info">
                <span class="name">{{ user.user_status === 2 ? '관리자' : user.nickname }}</span>
                <i @click="clickAddMenus" v-if="user.id === me.id" class="material-icons f-14 m-l-8">more_horiz</i>
            </div>
            <div class="timestamp">{{ timeStamp }}</div>
        </div>
        <div class="bottom">
            <p v-if="!editMode" class="content" v-text="comment.content" />
            <div v-else class="edit-mode">
                <TextareaWithX v-model="commentContent" />
                <div class="btns">
                    <div @click="cancelEditMode" class="btn btn-brd">취소</div>
                    <div @click="editComment" class="btn btn-brd m-r-8">수정</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commentsService from '@/services/comments'

export default {
    name: 'CommentItem',
    props: ['comment', 'postId'],
    data: () => ({
        editMode: false,
        commentContent: null,
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
    },
    methods: {
        cancelEditMode() {
            this.editMode = false
            this.commentContent = null
        },
        async editComment() {
            const { data } = await commentsService.comment.fixComment(this.comment.id, {
                content: this.commentContent,
            })
            await this.$store.dispatch('getCurrentPostComments', this.postId)
            this.cancelEditMode()
            this.$toast.success(data.msg)
        },
        clickAddMenus() {
            if (this.editMode) return

            this.$actionSheet({
                buttons: [
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
                                    await this.$store.dispatch('getCurrentPostComments', this.postId)

                                    this.$toast.success(data.msg)
                                }
                            }, 200)
                        },
                    },
                ],
            })
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
            white-space: pre-line;
            line-height: 16px;
            font-size: 14px;
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
    }
}
</style>
