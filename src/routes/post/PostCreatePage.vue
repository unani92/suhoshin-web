<template>
    <div class="post-create">
        <StackRouterHeaderBar :left-button-handler="backHandler" :show-title="true" title="게시글 작성" />
        <div class="container">
            <div class="item m-b-16">
                <TextareaWithX placeholder="제목" v-model="title" :is-input-mode="true" />
                <SelectInput
                    class="m-t-8"
                    :scroll-fix="true"
                    :options="postType"
                    :placeholder="'분류'"
                    :already-selected="editPost ? alreadySelectedPostType : null"
                    @selected="selectPostType"
                />
                <div class="check-list m-t-8" v-if="me.user_status === 2">
                    <div class="check-item m-r-16">
                        <CheckBox class="m-r-8" v-model="isMain" />
                        <span>메인으로 올리기</span>
                    </div>
                    <div class="check-item">
                        <CheckBox class="m-r-8" v-model="blockComment" />
                        <span>인증 사용자만 댓글 허용</span>
                    </div>
                </div>
            </div>
            <Editor :initial-value="post.content" v-if="post" :postId="post.id" :disabled="disabled" @save="savePost" />
        </div>
    </div>
</template>

<script>
import SelectInput from '@/components/app/SelectInput'
import Editor from '@/routes/post/components/Editor'
import postService from '@/services/post'

export default {
    name: 'PostCreatePage',
    components: { SelectInput, Editor },
    data: () => ({
        post: null,
        title: null,
        selectedPostType: null,
        alreadySelectedPostType: null,
        save: false,
        isMain: false,
        blockComment: false,
    }),
    props: {
        editPost: Object,
        pType: Number,
    },
    computed: {
        me() {
            return this.$store.getters.me
        },
        disabled() {
            return !(this.title && this.selectedPostType)
        },
        postType() {
            const selectors = [
                {
                    id: 1,
                    name: '공지사항',
                    userStatus: [2],
                },
                {
                    id: 2,
                    name: '자유게시판',
                    userStatus: [0, 1, 2],
                },
                {
                    id: 3,
                    name: '원정신청',
                    userStatus: [2],
                },
                {
                    id: 4,
                    name: '건의사항',
                    userStatus: [1, 2],
                },
                {
                    id: 5,
                    name: '수호신 상품 구매',
                    userStatus: [2],
                },
                {
                    id: 6,
                    name: '배너',
                    userStatus: [0, 1, 2],
                },
                {
                    id: 7,
                    name: '수호신 회의록',
                    userStatus: [2],
                },
            ]
            if (this.pType)
                return selectors.filter(item => item.userStatus.includes(this.me.user_status) && item.id === this.pType)

            return this.me.user_status === 2
                ? selectors
                : selectors.filter(item => item.userStatus.includes(this.me.user_status))
        },
    },
    async mounted() {
        if (this.editPost) {
            this.post = this.editPost
            this.title = this.editPost.title
            this.selectedPostType = this.editPost.post_type
            this.alreadySelectedPostType = this.postType.find(p => p.id === this.selectedPostType).id
            this.isMain = !!this.editPost.is_main
            this.blockComment = !!this.editPost.block_comment
        } else {
            const { data } = await postService.tempUpload()
            this.post = data
        }

        this.$registerBackHandler(this.backHandler)
    },
    beforeDestroy() {
        this.$unregisterBackHandler()
    },
    methods: {
        selectPostType(val) {
            this.selectedPostType = val
        },
        async savePost(val) {
            if (!val) return

            try {
                this.$loading(true)
                this.save = true
                this.$unregisterBackHandler()
                const payload = {
                    id: this.post.id,
                    title: this.title,
                    content: val,
                    post_type: this.selectedPostType.id,
                    is_main: this.isMain ? 1 : 0,
                    block_comment: this.blockComment ? 1 : 0,
                }

                const { data } = await postService.uploadPost(payload)
                await this.$store.dispatch('refresh')
                this.$toast.success(data.msg)
                this.$stackRouter.pop()
            } catch (e) {
                this.$toast.error(e.data.message)
            } finally {
                this.$loading(false)
            }
        },
        async backHandler() {
            if (!this.editPost) {
                await postService.deletePost(this.post.id)
            }
            this.$unregisterBackHandler()
            this.$stackRouter.pop()
        },
    },
}
</script>

<style scoped lang="scss">
.post-create {
    .container {
        padding: 16px;
    }
    .check-list {
        display: flex;
        align-items: center;

        .check-item {
            display: flex;
            align-items: center;
        }
    }
}
</style>
