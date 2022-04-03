<template>
    <div class="reply-item">
        <div class="top">
            <div class="user-info">
                <span class="name">{{ user.user_status === 2 ? '관리자' : user.nickname }}</span>
                <i v-if="user.id === me.id" @click="clickAddMenus" class="material-icons f-14 m-l-8">more_horiz</i>
            </div>
            <div class="timestamp">{{ timeStamp }}</div>
        </div>
        <div class="bottom">
            <div class="content">
                <i v-if="reply.secret && !editMode" class="material-icons f-14 m-r-4">lock</i>
                <p v-if="!editMode" class="content" v-text="$translate(reply.content)" />
                <div v-else class="edit-mode w-100">
                    <TextareaWithX v-model="replyContent" />
                    <div class="btns">
                        <div @click="cancelEditMode" class="btn btn-brd">취소</div>
                        <div @click="editReply" class="btn btn-brd m-r-8">수정</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commentsService from '@/services/comments'

export default {
    name: 'ReplyItem',
    props: ['reply', 'post'],
    data: () => ({
        editMode: false,
        replyContent: null,
    }),
    computed: {
        me() {
            return this.$store.getters.me
        },
        user() {
            return this.reply.user
        },
        timeStamp() {
            const createdAt = this.$moment(this.reply.created_at).subtract(9, 'hours')
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
                        this.replyContent = this.reply.content
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
                                try {
                                    const { data } = await commentsService.reply.deleteReply(this.reply.id)
                                    await this.$store.dispatch('getCurrentPostComments', this.post.id)

                                    this.$toast.success(data.msg)
                                } catch (e) {
                                    this.$toast.error(e.data.message)
                                }
                            }
                        }, 200)
                    },
                },
            ]

            return this.me.id === this.user.id ? btns : btns.slice(2, btns.length)
        },
    },
    methods: {
        clickAddMenus() {
            if (this.editMode) return

            this.$actionSheet({ buttons: this.buttons })
        },
        cancelEditMode() {
            this.editMode = false
            this.commentContent = null
        },
        async editReply() {
            try {
                const { data } = await commentsService.reply.fixReply(this.reply.id, {
                    content: this.replyContent,
                })
                await this.$store.dispatch('getCurrentPostComments', this.post.id)
                this.cancelEditMode()
                this.$toast.success(data.msg)
            } catch (e) {
                this.$toast.error(e.data.message)
            }
        },
    },
}
</script>

<style scoped lang="scss">
.reply-item {
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
}
</style>
