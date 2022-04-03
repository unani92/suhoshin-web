<template>
    <div class="comments" v-if="comments">
        <div class="component-header">
            <p class="f-16 spoqa-f-bold">댓글 {{ comments.count }}</p>
            <div class="comment-menu">
                <div class="check-box" @click="secret = !secret">
                    <i class="material-icons f-18">{{ `check_box${secret ? '' : '_outline_blank'}` }}</i>
                    <span class="f-14">비밀댓글</span>
                </div>
                <div @click="submitComment" :class="{ disabled: !content }" class="btn btn-primary">등록</div>
            </div>
        </div>
        <div class="text-area">
            <TextareaWithX v-model="content" />
        </div>
        <div class="comments-items m-t-8">
            <CommentItem :post="post" :comment="item" v-for="item in commentItems" :key="item.id" />
        </div>
    </div>
</template>

<script>
import commentService from '@/services/comments'
import CommentItem from '@/routes/post/components/CommentItem'

export default {
    name: 'Comments',
    props: ['comments', 'post'],
    components: { CommentItem },
    data: () => ({
        secret: false,
        content: null,
    }),
    computed: {
        commentItems() {
            return this.comments.comments
        },
    },
    methods: {
        async submitComment() {
            if (!this.content) return

            const { data } = await commentService.comment.createComment({
                secret: this.secret,
                content: this.content,
                post_id: this.post.id,
            })
            this.$set(this.post, 'comments', this.post.comments + 1)
            this.secret = false
            this.content = null
            this.$toast.success(data.msg)
            this.$store.dispatch('getCurrentPostComments', this.post.id)
        },
    },
}
</script>

<style scoped lang="scss">
.comments {
    padding: 16px;
    margin-top: 16px;
    border-top: 1px solid $grey-03;

    .component-header {
        @include between;
        margin-bottom: 8px;

        .comment-menu {
            display: flex;
            align-items: center;

            .check-box {
                display: flex;
                align-items: center;
                margin-right: 8px;
            }
        }
    }

    .btn {
        width: fit-content !important;
        height: fit-content !important;
        padding: 4px 8px !important;
        font-size: 14px;
    }
}
</style>
